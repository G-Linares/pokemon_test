const axios = require('axios');

const mainController = {
    index : async(req, res) => {
        try {
          const pokemonAPI = await axios.get(`https://pokeapi.co/api/v2/pokemon`)
          console.log(pokemonAPI.data)
          res.render('index', {pokemon : pokemonAPI.data});
  
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