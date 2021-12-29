const axios = require('axios');

const mainController = {
    index : async(req, res) => {
        try {
          
          // const pokemonApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/`)
          // console.log(pokemonApi.data)
          // res.render('index', {pokemon : pokemonApi.data});
          
          //fetch al API de PokeAPI
          const pokemonApi = await axios.get("https://pokeapi.co/api/v2/pokemon");
          const pokemonApiLength = pokemonApi.data.results.length;
          const pokemonArray = [];
          
          for (let i = 0; i < pokemonApiLength; i++) {
            const currentPoke = pokemonApi.data.results[i];  
            //hago el fetch de nuevo para obtener datos de un cierto pokemon
            const pokeImage = await axios.get(currentPoke.url);
            //creo un array de objetos para almacenar todos sus datos
            const newPokeObj = {
              name: currentPoke.name,
              image: pokeImage.data.sprites.other.dream_world.front_default,
              id: pokeImage.data.id,
              type: pokeImage.data.types[0].type.name,
              weight: pokeImage.data.weight,
              attack: pokeImage.data.stats[1].base_stat,
              defense: pokeImage.data.stats[2].base_stat,
              ability: pokeImage.data.abilities[0].ability.name,
              
            };
            pokemonArray.push(newPokeObj);
          }
    
          res.render("index", { pokemon: pokemonArray });  
  
        } catch (error) {
          if(error.response){
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else if(err.request){
            console.log(err.request);
          } else {
            console.log('Error', err.message);
          }
        }
      }
      

}


module.exports = mainController;