const maxRecords = 12;
const limit = 5;
let offset = 0;
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('LoadMoreButton')
const rodapeCarregarBotao = document.getElementById('pageEnd')
console.log(rodapeCarregarBotao);


function convertPokemonToLi(pokemon){
    return ` 
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name" >${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}"
            alt="${pokemon.name}">
        </div>
    </li>`
}

function fimDaLista() {
    return `
    <span class="endnotification"> 
    <p>Fim da Página. Não há mais Pokemons :(</p> 
    </span>`
}

console.log(fimDaLista())

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qntRecordNextPage = offset + limit

    if (qntRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
        rodapeCarregarBotao.innerHTML = fimDaLista()

    } else {
        loadPokemonItens(offset, limit)
    }
})