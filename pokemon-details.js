const pokemonDetailsContainer = document.querySelector('#pokemon-details');
const backButton = document.querySelector('.back-button');

backButton.addEventListener('click', () => {
  window.location.href = 'index.html';
});

// Obtener el ID del Pokémon desde la URL
const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

async function getPokemonData() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const data = await response.json();

    const pokemonList = data.results;

    pokemonList.forEach(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();

      createPokemonCard(pokemonData);
    });
  } catch (error) {
    console.log("Error:", error);
  }
}

// Obtener los detalles del Pokémon
fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
  .then(response => response.json())
  .then(pokemon => {
    capitalizeFirstLetter(pokemon);
    createPokemonDetails(pokemon);
    getAndDisplayMoves(pokemon);
    setPokemonDetailsBackground(pokemon);
  });
  function capitalizeFirstLetter(pokemon) {
    pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  }
  function getShinyImageUrl(pokemon) {
    const spriteUrl = pokemon.sprites.front_default;
    const shinySpriteUrl = pokemon.sprites.front_shiny;
  
    if (shinySpriteUrl) {
      return shinySpriteUrl;
    } else {
      return spriteUrl;
    }
  }
  
// Crear los detalles del Pokémon
function createPokemonDetails(pokemon) {
  const name = document.createElement('h2');
  name.textContent = pokemon.name;

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('image-container');

  const mainImage = document.createElement('img');
  mainImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  mainImage.alt = pokemon.name;
  mainImage.classList.add('pokemon-image');

  const shinyImage = document.createElement('img');
  shinyImage.src = getShinyImageUrl(pokemon);
  shinyImage.alt = `Shiny ${pokemon.name}`;
  shinyImage.classList.add('shiny-pokemon-image');

  imageContainer.appendChild(mainImage);
  imageContainer.appendChild(shinyImage);

  

  const types = document.createElement('p');
  types.textContent = 'Tipos:';
  const typesList = document.createElement('ul');
  typesList.classList.add('moves-list');
  typesList.classList.add('types-list');

  // Mostrar los tipos del Pokémon
  pokemon.types.forEach(type => {
    const typeItem = document.createElement('li');
    const typeName = document.createElement('span');
    typeName.textContent = type.type.name;
    typeName.classList.add('attack-type');
    typeName.classList.add(type.type.name);
    typeItem.appendChild(typeName);
    typesList.appendChild(typeItem);
  });

  types.appendChild(typesList);

  const abilities = document.createElement('p');
  abilities.textContent = `Habilidades: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}`;

  const weight = document.createElement('p');
  weight.textContent = `Peso: ${pokemon.weight / 10} kg`;

  const height = document.createElement('p');
  height.textContent = `Altura: ${pokemon.height / 10} m`;

  const baseStats = document.createElement('p');
  baseStats.textContent = 'Estadisticas Base:';
  const statsList = document.createElement('ul');
  statsList.classList.add('stats-list');
  pokemon.stats.forEach(stat => {
    const listItem = document.createElement('li');
    const statName = document.createElement('span');
    statName.textContent = stat.stat.name;
    listItem.appendChild(statName);

    const statBar = document.createElement('div');
    statBar.classList.add('stat-bar');
    const statBarFill = document.createElement('div');
    statBarFill.classList.add('stat-bar-fill');
    statBarFill.style.width = `${stat.base_stat}%`;
    statBar.appendChild(statBarFill);

    const statValue = document.createElement('span');
    statValue.classList.add('stat-value');
    statValue.textContent = stat.base_stat;
    statBarFill.appendChild(statValue);

    listItem.appendChild(statBar);
    statsList.appendChild(listItem);
  });
  baseStats.appendChild(statsList);

  pokemonDetailsContainer.appendChild(name);
  pokemonDetailsContainer.appendChild(imageContainer);
  pokemonDetailsContainer.appendChild(types);
  pokemonDetailsContainer.appendChild(abilities);
  pokemonDetailsContainer.appendChild(weight);
  pokemonDetailsContainer.appendChild(height);
  pokemonDetailsContainer.appendChild(baseStats);
}

// Obtener y mostrar los movimientos del Pokémon
function getAndDisplayMoves(pokemon) {
  const moves = document.createElement('p');
  moves.textContent = 'Movimientos:';
  const movesList = document.createElement('ul');
  movesList.classList.add('moves-list');

  // Obtener los movimientos del Pokémon desde la API
  pokemon.moves.forEach(move => {
    fetch(move.move.url)
      .then(response => response.json())
      .then(moveData => {
        const moveName = moveData.name;
        const moveType = moveData.type.name;

        const moveItem = document.createElement('li');
        moveItem.innerHTML = `<span class="move-name">${moveName}</span>
                              <span class="attack-type ${moveType}">${moveType}</span>`;

        movesList.appendChild(moveItem);
      })
      .catch(error => {
        console.log('Error al obtener los detalles del movimiento:', error);
      });
  });

  moves.appendChild(movesList);
  pokemonDetailsContainer.appendChild(moves);
}

// Cambiar el color de fondo de la página según el tipo del Pokémon
function setPokemonDetailsBackground(pokemon) {
    const pokemonTypes = pokemon.types.map(type => type.type.name);
    const backgroundColor = getTypeColor(pokemonTypes[0]);
  
    if (pokemonTypes.length > 1) {
      const secondaryColor = getTypeColor(pokemonTypes[1]);
      document.body.style.background = `linear-gradient(to right, ${backgroundColor}, ${secondaryColor})`;
    } else {
      document.body.style.backgroundColor = backgroundColor;
    }
  }
  
  // Obtener el tipo de color del Pokémon
  function getTypeColor(type) {
    switch (type) {
      case 'normal':
        return '#A8A878';
      case 'fire':
        return '#F08030';
      case 'water':
        return '#6890F0';
      case 'electric':
        return '#F8D030';
      case 'grass':
        return '#78C850';
      case 'ice':
        return '#98D8D8';
      case 'fighting':
        return '#C03028';
      case 'poison':
        return '#A040A0';
      case 'ground':
        return '#E0C068';
      case 'flying':
        return '#A890F0';
      case 'psychic':
        return '#F85888';
      case 'bug':
        return '#A8B820';
      case 'rock':
        return '#B8A038';
      case 'ghost':
        return '#705898';
      case 'dragon':
        return '#7038F8';
      case 'dark':
        return '#705848';
      case 'steel':
        return '#B8B8D0';
      case 'fairy':
        return '#EE99AC';
      default:
        return '#000000';
    }
  }