const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json())
app.use(cors())
// app.use ((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept');
//   res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, OPTIONS");
//   next();
// })

const clientes = [
  {
    id: '1',
    nome: "José",
    fone: '11223344',
    email: 'jose@email.com'
  },
  {
    id: '2',
    nome: 'Ana',
    fone: '11225577',
    email: 'ana@email.com'
  }
]

app.post('/api/clientes', (req, res, next) => {
  const cliente = req.body;
  console.log(cliente);
  res.status(201).json({
    mensagem: "Cliente inserido"
  })
});


app.get('/api/clientes', (req, res, next) => {
  res.status(200).json({
    mensagem: "Tudo OK",
    clientes: clientes
  });
})

module.exports = app;

