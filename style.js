let pokemon = null;
let money = 0;
let moneyPerClick = 1;
let evolutionStage = 0;
let gigantimaxed = false;
let gigantimaxInterval = null;

const pokemons = {
    bulbasaur: {
        names: ["Bulbasaur", "Ivysaur", "Venusaur", "Mega Venusaur"],
        imgs: [
            "https://img.pokemondb.net/artwork/large/bulbasaur.jpg",
            "https://img.pokemondb.net/artwork/large/ivysaur.jpg",
            "https://img.pokemondb.net/artwork/large/venusaur.jpg",
            "https://img.pokemondb.net/artwork/large/venusaur-mega.jpg"
        ]
    },
    charmander: {
        names: ["Charmander", "Charmeleon", "Charizard", "Mega Charizard X"],
        imgs: [
            "https://img.pokemondb.net/artwork/large/charmander.jpg",
            "https://img.pokemondb.net/artwork/large/charmeleon.jpg",
            "https://img.pokemondb.net/artwork/large/charizard.jpg",
            "https://img.pokemondb.net/artwork/large/charizard-mega-x.jpg"
        ]
    },
    squirtle: {
        names: ["Squirtle", "Wartortle", "Blastoise", "Mega Blastoise"],
        imgs: [
            "https://img.pokemondb.net/artwork/large/squirtle.jpg",
            "https://img.pokemondb.net/artwork/large/wartortle.jpg",
            "https://img.pokemondb.net/artwork/large/blastoise.jpg",
            "https://img.pokemondb.net/artwork/large/blastoise-mega.jpg"
        ]
    }
};

function chooseStarter(name) {
    pokemon = pokemons[name];
    document.getElementById('starter-selection').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    updatePokemon();

    // Start Gigantimax check interval
    setInterval(() => {
        if (!gigantimaxed && evolutionStage === 3 && Math.random() < 0.2) {
            document.getElementById('gigantimax').disabled = false;
        }
    }, 60000); // every 1 minute
}

function updatePokemon() {
    document.getElementById('pokemon-name').textContent = pokemon.names[evolutionStage];
    document.getElementById('pokemon-img').src = pokemon.imgs[evolutionStage];
    document.getElementById('money').textContent = money;
}

function clickPokemon() {
    money += moneyPerClick;
    document.getElementById('money').textContent = money;
}

function evolve(stage) {
    if (stage === 1 && evolutionStage === 0 && money >= 50) {
        money -= 50;
        evolutionStage = 1;
        moneyPerClick = 2;
        document.getElementById('evolve2').disabled = false;
    } else if (stage === 2 && evolutionStage === 1 && money >= 200) {
        money -= 200;
        evolutionStage = 2;
        moneyPerClick = 5;
        document.getElementById('mega').disabled = false;
    } else if (stage === 3 && evolutionStage === 2 && money >= 500) {
        money -= 500;
        evolutionStage = 3;
        moneyPerClick = 10;
    } else {
        return;
    }
    updatePokemon();
}

function gigantimax() {
    gigantimaxed = true;
    document.getElementById('gigantimax').disabled = true;
    let originalClick = moneyPerClick;
    moneyPerClick *= 3;

    gigantimaxInterval = setTimeout(() => {
        moneyPerClick = originalClick;
        gigantimaxed = false;
    }, 180000); // 3 minutes
}
