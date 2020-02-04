const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const {findConnections, sendMessage} = require('../websocket');

module.exports = {
    async index(request, response){
        const devs = await Dev.find(); //função find permite filtros Dev.find({name: 'Heitor' })
        return response.json(devs);   
    },    
    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;
        
        //declaração let permite a sobreposição da variavel em outro trecho do codigo
        //é igual a um select, evitando devs duplicados
        let dev = await Dev.findOne( { github_username } );

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            //continuar apos a resposta
        
            //Se o nome não existir será substituido por login
            const { name = login, avatar_url, bio } = apiResponse.data;
        
            console.log(name, avatar_url, bio, github_username, latitude, longitude);
        
            //conceitos do dry  dont repeat youserlf  - nao repetir as regras de negocio

            const techsArray = parseStringAsArray(techs); //techs.split(',').map(tech => tech.trim());
        
            const location = {
                type: 'Point',
                coordinates: [longitude,latitude],
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })     

            // filtrar conexões no maximo de 10km
            // e que o dev tenha ao menos uma das techs
            const sendSocketMessageTo = findConnections(
                {latitude, longitude },
                techsArray,
                )
            
            sendMessage(sendSocketMessageTo, 'new-dev', dev);   
        }
       return response.json(dev); 
        
    },
    async update(request, response){
        const { github_username, name, bio, techs, latitude, longitude } = request.body;
        const dev = await Dev.findOne( { github_username } );
        
        console.log(github_username, name, bio, techs, latitude, longitude );
        //se encontrar um dev, posso autualizar
        if (dev){
            
            console.log(dev);
            const techsArray = parseStringAsArray(techs); //techs.split(',').map(tech => tech.trim());
            //continuar apos a resposta
            //Se o nome não existir será substituido por login
    
            const location = {
                type: 'Point',
                coordinates: [longitude,latitude],
            };
            
            const NewValues = {
                github_username,
                name,
                bio,
                techs: techsArray,
                location,
            }
            
            const {_id} = dev;

            console.log(id_);
            const dev2 = await Dev.findByIdAndUpdate(id_,NewValues,{new : true});
           
            //return response.json({dev});    
            return response.json({Message: 'Sucesso!'});    
        }else{
            return response.json({Message: 'Error, user is not found!'});
        }
        
       
        
        
        
        /*const { name = login, avatar_url, bio, _id } = apiResponse.data;
        const techsArray = parseStringAsArray(techs); //techs.split(',').map(tech => tech.trim());
        const location = {
                type: 'Point',
                coordinates: [longitude,latitude],
            };
        
            console.log(github_username, techs, latitude, longitude );
        
        const lQuery =  { github_username: github_username };   


        dev = await Dev.update({
            github_username: { 
                $eq: github_username}      
            },{
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
        })   
    */

        return response.json([]);
    },

    async destroy(request, response){
    }

}