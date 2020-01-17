const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, res){
        //Buscar todos os devs num raio de 10km
        //Filtrar por tecnologias

        const { latitude, longitude, techs } = req.query;
        const techsArray = parseStringAsArray(techs);

        //buscando devs com filtros...
        const devs = await Dev.find({   
            //filtrando pelas tecnologias
            techs: {
                $in: techsArray,//buscando os users que estiverem dentro de $in que estao dentro de techsArray
            },
            //filtrando pela localização
            location: {
                //o operador $near me possibilita encontrar objetos perto de uma localização
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    //Informando o max de distância que sera retornado os objetos
                    $maxDistance: 10000,//passando em metros(10Km)
                },
            },
        });
        return res.json({ devs });
    }
}