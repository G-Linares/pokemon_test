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
          // const pokeAlltypes = [];

          // function allTypes(pokemonApiData){
            
          //   // console.log(pokemonApiData);
          //   for(let i = 0; i < pokemonApiData.lenght;i++){
          //     // console.log(pokemonApiTypesData[i].types[0].type.name);
          //     pokeAlltypes.push(pokemonApiData[i])
          //   }
          //   console.log(pokeAlltypes);
          //   return pokeAlltypes;
          // }

          function secondType(secondType){
            if(secondType){
              return secondType.type.name;
            } else return undefined;
          }
          
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
              // type2: pokeImage.data.types[1].type.name, 
              type2: secondType(pokeImage.data.types[1]),
              weight: pokeImage.data.weight,
              attack: pokeImage.data.stats[1].base_stat,
              defense: pokeImage.data.stats[2].base_stat,
              ability: pokeImage.data.abilities[0].ability.name,
              
            };
            pokemonArray.push(newPokeObj);
            // console.log(newPokeObj);
          }
    
          res.render("index1", { pokemon: pokemonArray });  
  
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