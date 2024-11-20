// script.js

document.getElementById('pokemonForm').addEventListener('submit', event => {
    event.preventDefault(); // Prevent the form from reloading the page
    const pokemonName = document.getElementById('pokemonName').value.trim().toLowerCase();
    fetchPokemon(pokemonName);
});

const fetchPokemon = (name) => {
    // Using a promise to fetch the Pokémon data
    // https://pokeapi.co/api/v2/pokemon/pikachu for example
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon not found");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            displayPokemon(data);
            displayNextPokemon(data);
            displayPrevPokemon(data);
        })
        .catch(error => {
            document.getElementById('pokemonInfo').textContent = error.message;
            document.getElementById('pokemonImage').hidden = true;
        });
}

const displayPokemon = (pokemon) => {
    // Display the Pokémon data
    document.getElementById('pokemonImage').src = pokemon.sprites.front_shiny;
    document.getElementById('pokemonImage').hidden = false;
    document.getElementById('pokemonInfo').textContent = `#${pokemon.id} ${pokemon.name} ${pokemon.height}`;
}

const displayNextPokemon = (pokemon) => {
    console.log('display next pokemon');

    // figure out what ID the next pokemon is
    const next_pokemon_id = pokemon.id + 1;
    console.log(next_pokemon_id);

    // fetch the next pokemon by id
    // https://pokeapi.co/api/v2/pokemon/pikachu for example
    fetch(`https://pokeapi.co/api/v2/pokemon/${next_pokemon_id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon not found");
            }
            return response.json();
        })
        .then(data => {
            console.log('WE FOUND THE NEXT POKEMON!');
            console.log(data);
            // display the next pokemon somewhere on the page
            document.getElementById('pokemonImageNext').src = data.sprites.front_shiny;
            document.getElementById('pokemonImageNext').hidden = false;
            document.getElementById('pokemonInfoNext').textContent = `#${data.id} ${data.name} ${data.height}`;
        })
        .catch(error => {
            document.getElementById('pokemonInfoNext').textContent = error.message;
            document.getElementById('pokemonImageNext').hidden = true;
        });
}

const displayPrevPokemon = (pokemon) => {
    console.log('display previous pokemon');

    // figure out what ID the next pokemon is
    const prev_pokemon_id = pokemon.id - 1;
    console.log(prev_pokemon_id);

    // fetch the next pokemon by id
    // https://pokeapi.co/api/v2/pokemon/pikachu for example
    fetch(`https://pokeapi.co/api/v2/pokemon/${prev_pokemon_id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon not found");
            }
            return response.json();
        })
        .then(data => {
            console.log('WE FOUND THE PREVIOUS POKEMON!');
            console.log(data);
            // display the next pokemon somewhere on the page
            document.getElementById('pokemonImagePrev').src = data.sprites.front_shiny;
            document.getElementById('pokemonImagePrev').hidden = false;
            document.getElementById('pokemonInfoPrev').textContent = `#${data.id} ${data.name} ${data.height}`;
        })
        .catch(error => {
            document.getElementById('pokemonInfoPrev').textContent = error.message;
            document.getElementById('pokemonImagePrev').hidden = true;
        });
}
