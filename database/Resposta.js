const Sequelize = require("sequelize");
const connection = require("./database");

//Definindo o model de Resposta. -> Representando uma tabela em código Js
const Resposta = connection.define('tb_respostas',{
    fk_pergunta: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ds_corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Resposta.sync({force: false});

module.exports = Resposta;