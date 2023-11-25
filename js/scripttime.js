const sectionTimes = document.querySelector('.times-container');

function criaCardPokemon() {

    for (let i = 0; i < localStorage.length; i++) {
        const divTime =  document.createElement('div');
        sectionTimes.appendChild(divTime);
        divTime.classList.add('time');

        const pNomeTime = document.createElement('p');
        divTime.appendChild(pNomeTime);
        pNomeTime.classList.add('nomeTime');

        const chave = localStorage.key(i);
        pNomeTime.textContent = chave;

        const ulTime = document.createElement('ul');
        divTime.appendChild(ulTime);

        const valor = JSON.parse(localStorage.getItem(chave));
        valor.forEach((pokemon) => {
            const liTime = document.createElement('li');
            ulTime.appendChild(liTime);

            const imgPokemon = document.createElement('img');
            imgPokemon.src = pokemon.img;
            liTime.appendChild(imgPokemon);

            const nomePokemon = document.createElement('p');
            nomePokemon.textContent = `Nome: ${pokemon.nome}`;
            liTime.appendChild(nomePokemon);

            const idPokemon = document.createElement('p');
            idPokemon.textContent = `ID: ${pokemon.id}`
            liTime.appendChild(idPokemon);

            const tipoPokemon = document.createElement('p');
            tipoPokemon.textContent = `Tipos: ${pokemon.tipo}`
            liTime.appendChild(tipoPokemon);

        });
        
    }

    
}

criaCardPokemon();