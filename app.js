const path = require("path");
const express = require("express");
const methodOverride = require("method-override");
const {sequelize} = require("./models");
const routes = require("./middlewares/locals");
const locals = require("./seeders/seed");

const app = express();
const PORT = process.env.PORT || 3000;

// VIEW ENGINE

app.set("view engine", "ejs");
// Front vai ser renderizado por ejs
app.set("views", path.join(__dirname, "views"));


//Middlewares
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("__method"));
// permite PUT / PATCH / DELETE via FORMULÁRIOS (?_method = PUT)

app.use(express.static(path.join(__dirname, "public")));
app.use(locals);

//Rotas
app.use(routes);

//ERROR - tratativa de erros usando 404
app.use(req, res => {
    res.status(404).render("404", {title: "Página não encontrada"});
});

//ERROS 
// 
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).render("error", {title : "Erro", error: err});
});

(async () => {
    try{
        await sequelize.sync();
        await seed({onlyIfEmpty: true});
        app.listen(PORT, () => {
            console.log("\n Helpdesk Ti rodando em http://localhost:${PORT}\n");
        });
    } catch (err){
        console.error("Falha ao iniciar a aplicação: ", err);
        process.exit(1);
    }
})();

// Criação do servidor 

// requisitando partes do código que serão utilizadas em outro momento

// helpuse rotas

// qualquer parte do projeto vai partir daqui

// Como desenvolver utilizando boas práticas

// Status 500 e renderizando um erro caso dê errado

// Criação de comunicação assÍncrona, com uma crição de uma porta

// console.log uma aplicação ou mostrar se dá erro ou dá certo pelo terminal

// APENAS PARA CRIAR O SERVIDOR