const  Sequelize = require('sequelize');

/* Criando a conexão ao BD, atribuindo o nome do BD, usuario, senha, servidor e tipo do BD. */
const connection = new Sequelize('perguntas', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    logging: false
});

module.exports = connection;