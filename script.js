const pokemonContainer = document.getElementById("pokemon-list");

// Función para obtener los datos de los Pokémon de la PokeAPI
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

// Función para crear una tarjeta de Pokémon
function createPokemonCard(pokemon) {
  const card = document.createElement("div");
  card.classList.add("card");

  const image = document.createElement("img");
  image.src = pokemon.sprites.front_default;
  image.alt = pokemon.name;

  const name = document.createElement("h3");
  name.textContent = capitalizeFirstLetter(pokemon.name);

  const types = document.createElement("p");
  types.textContent = `Type(s): ${pokemon.types.map((type) => type.type.name).join(", ")}`;

  const detailsButton = document.createElement("button");
  detailsButton.textContent = "Ver Detalles";
  detailsButton.addEventListener("click", function() {
    window.location.href = `pokemon-details.html?name=${pokemon.name}`;
  });

  card.appendChild(image);
  card.appendChild(name);
  card.appendChild(types);
  card.appendChild(detailsButton);

  pokemonContainer.appendChild(card);
}

// Función para capitalizar la primera letra de un string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Cargar los datos de los Pokémon al cargar la página
getPokemonData();
