const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');
//Schema é a estruturação de uma entidade dentro do banco de dados...
const DevSchema = new mongoose.Schema({
    name: String,//nome do usuário
    github_username: String,//link do github
    bio: String,//biograia
    avatar_url: String,//avatar(imagem)
    techs: [String],//Informando que o campo techs armazena várias strings(um array)
    location: {
        type: PointSchema,
        index: '2dsphere'//criando índice para facilitar a busca posteriormente...
    }
});
//exportando o módulo DevSchema - O 1º parameter é o nome que será gravado no banco e o 2º o schema...
module.exports = mongoose.model('Dev', DevSchema);

