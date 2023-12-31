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

function mostraPokemons(pokemons) {
    pokemons.forEach(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        
        const card = criaCardPokemon(data);

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
        });
        listaPokemons.appendChild(card);
    });
}

async function comparaPokemons(pokemonPesquisado) {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        const pokemons = data.results;

        pokemons.forEach(async (pokemon) => {
            const response = await fetch(pokemon.url);
            const data = await response.json();
            

            if (data.name === pokemonPesquisado) {
                return true
            } else {
                return false
            }
        });
        
    } catch (error) {
        console.error('Erro durante a requisição', error);
    }
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

const inputPesquisa = document.getElementById('procurar-input');

