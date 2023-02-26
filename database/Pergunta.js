const Sequelize = require("sequelize");
const connection = require("./database");

//Definindo o model de Pergunta. -> Representando uma tabela em código Js
const Pergunta = connection.define('tb_perguntas',{
    ds_titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ds_descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(()=>{});

module.exports = Pergunta;