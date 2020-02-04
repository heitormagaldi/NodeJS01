
//com a {} eu importo somente parte dos pacotes de express, neste caso somente as rotas.
const { Router } = require('express');

const DevController = require('./controllers/DevController'); 
const SearchController = require('./controllers/SearchController');
const routes = Router();


//funcoes de um controller
//*INDEX - MOSTRAR LISTA
//*SHOW - MOSTRAR UM UNICO
//*STORE - ARMAZENAR
//*UPDATE -ALTERAR 
//*DESTROY - REMOVER 

routes.get('/devs', DevController.index);
routes.put('/devs', DevController.update);
routes.post('/devs', DevController.store);
routes.get('/search', SearchController.index);

module.exports = routes;

    //
    //const apiResponse = await axios.get(`https://api.github.com/users/diego3g`);
    
    // aguarda o sistema retornar com a clausula wait.


    //const { name = login, avatar_url, bio } = apiResponse.data;
   
    //parei com 1:02
    
    
   //console.log(name, avatar_url, bio, github_username);
   //console.log(apiResponse.data);
   
   //return response.json(dev);






//metodos HTTP:  get pegar, post criar, put edita, delete deletar

//TIPOS DE PARAMETROS
//QUERY Params : request.Query filtros, ordenação e criação - adicionados a URL /?search
    //http://localhost:3333/?user=heitor
//ROUTE Params: request.params(Identificar um recurso )
//Body params: request.body (Dados para criação ou alteração de um registro)


//MONGODB (NAO RELACIONAL)