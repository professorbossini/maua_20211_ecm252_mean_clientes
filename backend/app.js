const path = require ('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use('/imagens', express.static(path.join('backend/imagens')));
app.use(cors());


const clienteRoutes = require ('./rotas/clientes');
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

app.use('/api/clientes', clienteRoutes);

module.exports = app;

