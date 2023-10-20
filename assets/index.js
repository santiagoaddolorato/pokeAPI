 const pokemonsContainer = document.querySelector("#caja");

 const appState = {
    currentURL: "https://pokeapi.co/api/v2/pokemon/?limit=8&offset=0",
    isfetching: false,
 };
 
 const getPokemonsData = async ()=>{
    const {next, results} = await 
    fetchPokemons(appState.currentURL);
    appState.currentURL = next;

    const pokemonDataUrls = results.map((pokemon)=>{
        return pokemon.url;
    });
    const pokemonsData = await Promise.all(
        pokemonDataUrls.map( async (url)=>{
            const nextPokemonsData = await fetch(url);
            return await nextPokemonsData.json();
        })
    );
    console.log(pokemonsData);
    return pokemonsData;    
 };

 pokemonTemplate = (pokemon) =>{
   return {
      image:pokemon.sprites.other.home.front_default,
      name:pokemon.name.toUpperCase(),
      experience:pokemon.base_experience,
      types: pokemon.types,
      id:pokemon.id,
      height: pokemon.height / 10,
      weight:pokemon.weight / 10,
   };
 };

 const createTypeSpan =(types)=>{
    return types.map((tipo)=>{
      return `<span class="${tipo.type.name}
      poke__type">${tipo.type.name}</span>`
    }).join("");
 }

 const pokemonCardTemplate = (pokemon) =>{
   const {image, name, experience, types, id, height, weight}
    = pokemonTemplate(pokemon);
   return `
   <div class="poke">
      <img src="${image}" />
      <h2>${name}</h2>
      <span class="exp">EXP: ${experience}</span>
      <div class="tipo-poke">${createTypeSpan(types)}</div>
      <p class="id-poke">#${id}ID</p>
      <p class="height">Height: ${height}m</p>
      <p class="weight">Weight: ${weight}g</p>
</div>
   `;
 };

 const renderPokemonList = (pokemonList) =>{
    pokemonsContainer.innerHTML+= pokemonList.map((pokemon)=>{
      return  pokemonCardTemplate(pokemon);
       
    }).join("");
 }
 
 const loadAndRenderPokemons = async(renderingFunction)=>{
    const pokemonsData = await getPokemonsData();
    renderingFunction(pokemonsData);
 };
 
 function init() {
    window.addEventListener("DOMContentLoaded",
    async ()=>  await loadAndRenderPokemons(renderPokemonList));
 }

 init();