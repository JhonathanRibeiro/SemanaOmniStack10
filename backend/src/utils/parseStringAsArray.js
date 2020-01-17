
module.exports = function parseStringAsArray(arrayAsString){
   //recebendo string, convertendo em array - percorrendo as techs com map e para cada, limpa os espaços com trim()
   return arrayAsString.split(',').map(tech=> tech.trim());
}