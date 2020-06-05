function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then( states => {

        for( const state of states ){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`  
        }
})
}
populateUFs()

function getCities(event){
    const stateInput = document.querySelector("[name=state]")
    const citySelect = document.querySelector("[name=city]")
    const ufValue = event.target.value
    
    const indexOfSelected = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelected].text
    citySelect.innerHTML = '<option value>Selecione a cidade</option>'
    citySelect.disabled = true
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    fetch(url)
    .then(res => res.json() )
    .then( cities => {
        for(const cidade of cities ){
            citySelect.innerHTML += `<option value="${cidade.nome}">${cidade.nome}</option>`            
        }
    citySelect.disabled = false
})
}
document.querySelector("select[name=uf]")
        .addEventListener("change", getCities)

//Itens de coleta.


const itemsToCollect = document.querySelectorAll('.items-grid li')

for( const item of itemsToCollect) {
    item.addEventListener('click', handleSelectedItem)
}
const collectedItems = document.querySelector('input[name=items]')
let selectedItems = []

function handleSelectedItem(event) {
    //add or remove a class with JS
    const itemLi = event.target
    const itemId = itemLi.dataset.id
    itemLi.classList.toggle('selected')
    const alreadySelected = selectedItems.findIndex( item  => {return item == itemId})

    if(alreadySelected >= 0) {
        const filteredItens = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return false
        })

        selectedItems = filteredItens
    }else{
        selectedItems.push(itemId)
    }
    
    collectedItems.value = selectedItems
} 
