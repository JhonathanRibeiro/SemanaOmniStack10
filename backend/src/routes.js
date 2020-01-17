//Estrutura para importar módulos especíicos do express...
const { Router } = require('express');
const routes = Router();//importando a funcao Router do express e atribuindo a var router...
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

//as rotas podem ter o mesmo nome desde que os mestodos sejam diferentes
routes.get('/devs', DevController.index);//rota de busca de devs

//Rota de cadastro de devs
routes.post('/devs', DevController.store);

//pesquisa de devs para o app
routes.get('/search', SearchController.index);

//exportando as rotas para que a aplicação entenda etc...
module.exports = routes;