const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

// DataBase

connection
    .authenticate()
    .then(() => {
        console.log("Sucesso! Conexão feita com BD.")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// Definindo a utilização do EJS como View Engine para o Express.
app.set('view engine', 'ejs');
// Definindo a utilização de arquivos estáticos.
app.use(express.static('public'));
// Body Parser / Definindo a decodificação dos dados do formulário para Js. / Definindo a decodificação dos dados Json.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Rotas
app.get("/", (req, res) => {
    Pergunta.findAll({
        raw: true, order: [
            ['id', 'DESC']
        ]
    }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });
});

app.get("/pergunta/:id", (req, res) => {
    var idPergunta = req.params.id;

    Pergunta.findOne({
        where: { id: idPergunta }
    })
        .then(pergunta => {

            if (pergunta != undefined) { //Pergunta encontrada
                Resposta.findAll({
                    order: [
                        ['id', 'DESC']
                    ],
                    where: { fk_pergunta: idPergunta }
                }).then(respostas => {
                    res.render("pergunta", {
                        pergunta: pergunta,
                        respostas: respostas
                    });
                });
            } else { //Não encontrada
                res.redirect("/");
            }
        });

});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/enviarpergunta", (req, res) => {
    var tituloPergunta = req.body.titulo;
    var descricaoPergunta = req.body.descricao;
    // create -> INSERT
    Pergunta.create({
        ds_titulo: tituloPergunta,
        ds_descricao: descricaoPergunta
    }).then(() => {
        res.redirect("/");
    }).catch((msgErro) => {
        res.log("Não foi possível enviar a pergunta. INFO: " + msgErro);
    });
});


app.post("/responder", (req, res) => {
    var perguntaFk = req.body.perguntaFk;
    var corpo = req.body.corpo;

    Resposta.create({
        fk_pergunta: perguntaFk,
        ds_corpo: corpo
    }).then(() => {
        res.redirect(`/pergunta/${perguntaFk}`);
    });
});

// Inicializando o site/servidor.
app.listen(8080, () => {
    console.log("Site funcionando!")
});