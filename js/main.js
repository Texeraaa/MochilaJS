const form = document.getElementById("novoItem"); //pega o form
const lista = document.getElementById('lista') //pega a lista da mochilo do HTML
const itens = JSON.parse(localStorage.getItem("itens")) || [] //pega itens do local storage convertido em JSON ou cria lista vazia

itens.forEach((elemento) => { 
    criaElemento(elemento)
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']   
    
    const existe = itens.find( elemento => elemento.nome === nome.value)
    
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }
    if(existe){
        itemAtual.id = existe.id
        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    }else{
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;
        criaElemento(itemAtual)
        itens.push(itemAtual)
    }
    
    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
})

function criaElemento(item){
    const novoItem = document.createElement('li') //criou um elemento li de lista
    novoItem.classList.add("item") //criou uma classe "item" dentro da li

    const numeroItem = document.createElement('strong') //adicionou a tag <strong> dentro da li
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id 
    novoItem.appendChild(numeroItem)

    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))
    lista.appendChild(novoItem)
}
function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}
function botaoDeleta(id){
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deletaElemento(tag, id){
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}