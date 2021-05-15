const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json())
app.use(cors())
const Cliente = require('./models/cliente');

const dbUser = process.env.MONGODB_USER;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbCluster = process.env.MONGODB_CLUSTER;
const dbName = process.env.MONGODB_DATABASE;

const stringConexao = `mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`



mongoose.connect(stringConexao)
.then(() => {
  console.log ("Conexão MongoDB OK");
})
.catch(err => {
  console.log(`Conexão MongoDB NOK: ${err}`);
})

//http://localhost:3000/api/clientes/fweafwea98fwea
app.delete('/api/clientes/:id', (req, res) => {
  Cliente.deleteOne({_id: req.params.id})
  .then((resultado) => {
    console.log(resultado);
    res.status(200).end();
  })
});


app.post('/api/clientes', (req, res, next) => {
  const cliente = new Cliente({
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email
  })
  cliente.save().then((clienteInserido) => {

    res.status(201).json({
      id: clienteInserido._id,
      mensagem: "Cliente inserido"
    })
  });
});


app.get('/api/clientes', (req, res, next) => {
  Cliente.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK",
      clientes: documents
    });
  })
})

module.exports = app;

