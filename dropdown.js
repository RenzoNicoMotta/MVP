const dropdownBtn = document.querySelector(".dropdown-btn");
const dropdownBtn2 = document.querySelector(".dropdown-btn2");
const dropdownContent = document.querySelector(".dropdown-content");
const dropdownContent2 = document.querySelector(".dropdown-content2");
const pokemonList = document.getElementById("pokemon-list");

function fetchPokemonTypes() {
  fetch("https://pokeapi.co/api/v2/type")
    .then(response => response.json())
    .then(data => {
      const types = data.results;
      types.forEach(type => {
        createTypeButton(type.name);
      });
    })
    .catch(error => console.log(error));
}

dropdownBtn.addEventListener("click", () => {
  dropdownContent.classList.toggle("show");
});

dropdownContent.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    const selectedType = event.target.dataset.type;
    filterPokemonsByType(selectedType);
  }
});

function createTypeButton(type) {
  const button = document.createElement("a");
  button.textContent = capitalizeFirstLetter(type);
  button.dataset.type = type;
  dropdownContent.appendChild(button);
}

function filterPokemonsByType(type) {
  fetch(`https://pokeapi.co/api/v2/type/${type}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Tipo de Pokémon no encontrado");
      }
      return response.json();
    })
    .then(data => {
      const pokemonUrls = data.pokemon.map(pokemon => pokemon.pokemon.url);
      getPokemons(pokemonUrls);
    })
    .catch(error => console.log(error));
}

function fetchPokemonGeneration() {
  fetch("https://pokeapi.co/api/v2/generation")
    .then(response => response.json())
    .then(data => {
      const gen = data.results;
      gen.forEach(gen => {
        createGenButton(gen.name);
      });
    })
    .catch(error => console.log(error));
}

dropdownBtn2.addEventListener("click", () => {
  dropdownContent2.classList.toggle("show");
});

dropdownContent2.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    const selectedGen = event.target.dataset.type;
    filterPokemonsByRegion(selectedGen);
  }
});

function createGenButton(gen) {
  const button = document.createElement("a");
  button.textContent = capitalizeFirstLetter(gen);
  button.dataset.type = gen;
  dropdownContent2.appendChild(button);
}

function filterPokemonsByRegion(gen) {
  fetch(`https://pokeapi.co/api/v2/generation/${gen}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Región de Pokémon no encontrada");
      }
      return response.json();
    })
    .then(data => {
      const pokemonRegion = data.pokemon_species.map(pokemon_species => pokemon_species.name);
      getPokemones(pokemonRegion);
    })
    .catch(error => console.log(error));
}


function getPokemones(pokemonRegion) {
  pokemonList.innerHTML = ""; // Limpiamos la lista antes de añadir los nuevos pokémon

  // Iteramos sobre cada nombre de pokémon en el array
  pokemonRegion.forEach(pokemonName => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos del Pokémon");
        }
        return response.json();
      })
      .then(pokemonData => {
        const pokemonCard = createPokemonCard(pokemonData);
        pokemonList.appendChild(pokemonCard);
      })
      .catch(error => console.log(error));
  });
}


function getPokemons(pokemonUrls) {
  Promise.all(pokemonUrls.map(url => fetch(url).then(response => response.json())))
    .then(pokemons => {
      pokemonList.innerHTML = "";
      pokemons.forEach(pokemon => {
        const pokemonCard = createPokemonCard(pokemon);
        pokemonList.appendChild(pokemonCard);
      });
    })
    .catch(error => console.log(error));
}

function createPokemonCard(pokemon) {
  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add("card");

  const pokemonName = document.createElement("h2");
  pokemonName.textContent = capitalizeFirstLetter(pokemon.name);
  pokemonCard.appendChild(pokemonName);

  const pokemonImage = document.createElement("img");
  pokemonImage.src = pokemon.sprites.front_default;
  pokemonImage.alt = pokemon.name;
  pokemonCard.appendChild(pokemonImage);

  const pokemonTypes = document.createElement("p");
  const types = pokemon.types.map(type => capitalizeFirstLetter(type.type.name)).join(", ");
  pokemonTypes.textContent = `Type: ${types}`;
  pokemonCard.appendChild(pokemonTypes);

  const detailsButton = document.createElement("button");
  detailsButton.textContent = "Ver Detalles";
  detailsButton.classList.add("detalles")
  detailsButton.addEventListener("click", function() {
    window.location.href = `pokemon-details.html?id=${pokemon.id}`;
  });
  pokemonCard.appendChild(detailsButton);

  return pokemonCard;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Obtener la lista de tipos y generaciones de Pokémon al cargar la página
fetchPokemonTypes();
fetchPokemonGeneration();
