// CODE EXPLAINED channel
const input = document.getElementById('input')
const clear = document.querySelector('.clear')
const dateElement = document.getElementById('date')
const list = document.getElementById('list')

//PROPRIEDADE DE MARCAR COMO OK, DESMARCAR, POR LINHA ACIMA DA PALAVRA
const CHECK = 'fa-check-circle'
const UNCHECK = 'fa-circle-thin'
const LINE_THROUGH = 'lineThrough'

//VARIÁVEIS PARA DEFINIR SE O ITEM ESTÁ MARCADO, CHECADO E ETC
let id
let lista

//LOCAL STORAGE - AO SAIR OU REINICIAR A PÁGINA NÃO HAVERÁ ALTERAÇÕES NO PROGRESSO
let data=localStorage.getItem('TODO')
if(data){
    lista=JSON.parse(data)
    id=lista.length
    carregarLista(lista)
}else{
    lista=[]
    id=0
    
}
function carregarLista(lv){
    lv.forEach(function(element) {
        addTodo(element.nome,element.id,element.feito,element.lixo)
    });

}

//Data de hoje
const today = new Date()
const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }

dateElement.innerHTML = today.toLocaleDateString('pt-br', options)


//Adicionar elementos nos itens
function addTodo(toDo, id, marcar, lixo) {
    if (lixo) { return; }
    
    const DONE = marcar ? CHECK : UNCHECK
    const LINE = marcar ? LINE_THROUGH : ""
    
    const position = 'beforeend'
    const item = `
    <li class="item">
    <i class="fa ${DONE}  co" job='complete' id=${id}></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-trash-o de" job='delete' id=${id}></i>
    </li>
    `
    list.insertAdjacentHTML(position, item)
}


input.addEventListener('keyup', function (even) {
    if (even.keyCode == 13) {
        const toDo = input.value
        if (toDo) {
            addTodo(toDo, id, false, false)
            
            lista.push({
                nome: toDo,
                id: id,
                feito: false,
                lixo: false
            }
            )
            id++;
            localStorage.setItem('TODO',JSON.stringify(lista))
        }
        input.value = ''
    }
})
function completeTodo(elemento){
    elemento.classList.toggle(CHECK)
    elemento.classList.toggle(UNCHECK)
    // console.log(elemento.parentNode.parentNode)
    elemento.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH)
    lista[elemento.id].feito=lista[elemento.id].feito ? false : true
    
}
function removeTodo(elemento){
    elemento.parentNode.parentNode.removeChild(elemento.parentNode)
    
    lista[elemento.id].lixo=true
    
    
}
list.addEventListener('click',function(evento){
    const elementoAlvo=evento.target
    
    const Complete_or_Remove=elementoAlvo.attributes.job.value
    console.log(Complete_or_Remove)
    if(Complete_or_Remove=='complete'){
        completeTodo(elementoAlvo)
    }
    else if(Complete_or_Remove=='delete'){
        removeTodo(elementoAlvo)
    }
    
    localStorage.setItem('TODO',JSON.stringify(lista))
})