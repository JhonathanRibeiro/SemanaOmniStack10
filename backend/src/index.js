const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();
//conexao com o banco...
mongoose.connect('mongodb+srv://omnistack10:123@cluster0-ueq7e.mongodb.net/week10?retryWrites=true&w=majority',{
    //removendo warnings do console(terminal)
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//liberando acesso externo para qualquer aplicação
app.use(cors());
//informando ao express que o metodo de envio de dados será o JSON
app.use(express.json());
//usando as rotas
app.use(routes);
//listando a porta 
app.listen(3333);



