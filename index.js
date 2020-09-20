const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const Web3 = require('web3');
const truffle_connect = require('./connection/app.js');
const bodyParser = require('body-parser');
app.use(bodyParser.json())

app.get('/candidato/:id', function (req, res) {
    var id= req.params.id;
    var c = {
        id: null,
        name: null,
        voteCount: null,
    };

    truffle_connect.candidatos(id, function (value) {
        c = {
            id: value[0],
            name: value[1],
            voteCount: value[2]
        }
        res.send(c);
    })
});
app.get('/numeroCandidatos',function (req, res) {
    truffle_connect.numeroCandidatos(function (answer) {
        res.send(answer);
    })
});

app.post('/votar', (req, res) => {
    console.log(req.body);
  
    let id = req.body.id;
    let account = req.body.account;
  
    truffle_connect.votar(id, account, (response) => {
      res.send(response);
    });
  });
app.post('/agregarCandidato', (req, res) => {
    console.log(req.body);
    let nombre = req.body.nombre;
    let account = req.body.account;
  
    truffle_connect.agregarCandidato(nombre, account, (response) => {
      res.send(response);
    });
  });
app.listen(3000, () => {
    truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
    console.log("El servidor está inicializado en el puerto 3000");
});