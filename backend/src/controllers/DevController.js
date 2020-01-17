const axios = require('axios');//modulo que faz chamadas a api externas...
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    //método de listagem de devs
    async index(req, res) {
        const devs = await Dev.find();
        return res.json(devs);
    },
    //método de cadastro de devs
    async store(req, res){
        //buscando dados do dev a ser cadastrado...
        const { github_username, techs, latitude, longitude } = req.body;
        //verificando se existe um username igual para evitar duplicação
        let dev = await Dev.findOne({ github_username });
       
        //verificando se existe um dev
        if(!dev) {
        //chama a api do github
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        //exibindo os dados da resposta - usando desestruturação para buscar dados específicos...
        let { name = login, avatar_url, bio } = apiResponse.data;
        //verificando se o user tem name pois nao é um campo obrigatorio no github, 
        //se nao existir pega o login...utilizou-se um forma abreviada acima na desestruturação name = login
        // if(!name) {name = apiResponse.data.login;}
        console.log(name, bio, avatar_url, github_username); //O map percorre um array
        //recebendo string, convertendo em array - percorrendo as techs com map e para cada, limpa os espaços com trim()
        const techsArray = parseStringAsArray(techs); //foi externado em uma função ...
        //conigurando para gravar a lat e long
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };
        //criando um dev
        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
        });
      }
      return res.json(dev);
    }
};