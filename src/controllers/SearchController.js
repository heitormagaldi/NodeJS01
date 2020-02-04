const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response){
      //busca dos devs em um raio  
      //filtrar por tecnologias
      const { latitude, longitude , techs} = request.query;
      const techsArray = parseStringAsArray(techs);
      
      const devs = await Dev.find({
          techs: {
              $in:techsArray,
          },
          location: {
              $near: {
                  $geometry: {
                      type: 'Point',
                      coordinates: [longitude,latitude],
                  },
                  $maxDistance: 10000,
              },
          },
      })
      console.log(devs);  
      //return response.json( {devs :[]});
      return response.json( { devs } );

    },
    async update(request, response){
    
    
    
    
    },

    async destroy(request, response){
    }
}