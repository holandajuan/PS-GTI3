
const listaPokemons = document.querySelector('.lista-pokemons ul');
const nomeTime = document.getElementById('nome-time');
let selectedPokemons = [];

async function fetchPokemons() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        const pokemons = data.results;
        mostraPokemons(pokemons);
    } catch (error) {
        console.error('Erro durante a requisição', error);
    }
}
let arrayTimes = [];
function mostraPokemons(pokemons) {
    pokemons.forEach(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        
        const card = criaCardPokemon(data);

        card.addEventListener("click", function () {
            const objetoPokemon = {
                'nome': data.name,
                'id': data.id,
                'tipo': data.types.map(tipo => tipo.type.name).join(', '),
                'img': data.sprites.front_default
            }
            if (arrayTimes.length < 6) arrayTimes.push(objetoPokemon);

            cardClick(card);
        });
        listaPokemons.appendChild(card);
    });
}
function criaCardPokemon(pokemon) {

    const card = document.createElement('li');
    card.classList.add('card');
    card.style.listStyle = 'none';

    const img = document.createElement('img');
    img.src = pokemon.sprites.front_default;
    img.alt = pokemon.name;

    
    card.appendChild(img);

    const name = document.createElement('p');
    name.textContent = `Nome: ${pokemon.name}`;
    const id = document.createElement('p');
    id.textContent = `ID: ${pokemon.id}`;

    const types = document.createElement('p');
    types.textContent = `Tipos: ${pokemon.types.map(tipo => tipo.type.name).join(', ')}`;

    card.appendChild(name);
    card.appendChild(id);
    card.appendChild(types);

    return card;
}

let arrayTime = [];
function cardClick(pokemon) {
    if (arrayTime.length >= 6) return;

    const time = document.querySelector('#formação-time ul');
    time.appendChild(pokemon);
    arrayTime.push(pokemon);
}

document.getElementById('btn-salvartime').addEventListener('click', function (e) {
    if (nomeTime.value === '') {
        e.preventDefault();
        alert('Campo vazio');
    } else {
        localStorage.setItem(nomeTime.value, JSON.stringify(arrayTimes));
    }
})

async function pesquisarPokemon() {
    const termoPesquisa = inputPesquisa.value.toLowerCase();

    // Remover todos os cards atuais
    listaPokemons.innerHTML = '';

    // Se o campo de pesquisa estiver vazio, mostrar todos os cards novamente
    if (termoPesquisa === '') {
        fetchPokemons();  // Recarrega todos os Pokémon
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${termoPesquisa}`);
        const data = await response.json();

        const card = criaCardPokemon(data);
        listaPokemons.appendChild(card);

        // Adicionar o evento de clique após criar o card
        card.addEventListener("click", function () {
            console.log(data);
            const objetoPokemon = {
                'nome': data.name,
                'id': data.id,
                'tipo': data.types.map(tipo => tipo.type.name).join(', '),
                'img': data.sprites.front_default
            }
            if (arrayTimes.length < 6) arrayTimes.push(objetoPokemon);

            cardClick(card);
            fetchPokemons();
        });
    } catch (error) {
        console.error('Erro durante a requisição', error);
        console.log('Nenhum Pokémon encontrado');
    }
}



fetchPokemons();