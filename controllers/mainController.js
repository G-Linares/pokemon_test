const axios = require('axios');
const { render } = require('express/lib/response');


function secondType(secondType){
  if(secondType){
    return secondType.type.name;
  } else return undefined;
}


const mainController = {
    index : async(req, res) => {
        try {
          //fetch al API de PokeAPI
          const pokemonApi = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=25");
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
              type1: pokeImage.data.types[0].type.name, 
              type2: secondType(pokeImage.data.types[1]),
              weight: pokeImage.data.weight,
              attack: pokeImage.data.stats[1].base_stat,
              defense: pokeImage.data.stats[2].base_stat,
              ability: pokeImage.data.abilities[0].ability.name,
              sprite: pokeImage.data.sprites.front_default,
              shinysprite: pokeImage.data.sprites.front_shiny,
            };
            pokemonArray.push(newPokeObj);
         
          }
          res.render("index", { pokemon: pokemonArray });  
          
        } catch (error) {
          if(error.response){
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if(error.request){
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
        }
    },

    results: async(req,res) => {
      const pokemonApi = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
      const allPokeNAmes = pokemonApi.data.results;
      let results = [];
      let nameSearched = req.query.keywords;

      allPokeNAmes.forEach(element => {
        if(element.name.includes(nameSearched)){
          results.push(element);
        }
      });

      try {
        const pokemonArray = [];
        for (let i = 0; i < results.length; i++) {
          const currentPoke = results[i]; 
          const pokeImage = await axios.get(results[i].url);   
          const newPokeObj = {
            name: currentPoke.name,
            image: pokeImage.data.sprites.other.dream_world.front_default,
            id: pokeImage.data.id,
            type1: pokeImage.data.types[0].type.name, 
            type2: secondType(pokeImage.data.types[1]),
            weight: pokeImage.data.weight,
            attack: pokeImage.data.stats[1].base_stat,
            defense: pokeImage.data.stats[2].base_stat,
            ability: pokeImage.data.abilities[0].ability.name,
            sprite: pokeImage.data.sprites.front_default,
            shinysprite: pokeImage.data.sprites.front_shiny,
          };
          pokemonArray.push(newPokeObj);
        }
        res.render("filtered", { pokemon: pokemonArray });  
          
      } catch (error) {
        if(error.response){
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if(error.request){
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      }       
    }
}


module.exports = mainController;