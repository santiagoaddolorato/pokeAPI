 const appState = {
    currentURL: "https://pokeapi.co/api/v2/pokemon/?limit=9&offset=0",
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
 
 const loadAndRenderPokemons = async()=>{
    const pokemonsData = await getPokemonsData()
 }
 
 function init() {
    window.addEventListener("DOMContentLoaded",
    async ()=>  await loadAndRenderPokemons());
 }