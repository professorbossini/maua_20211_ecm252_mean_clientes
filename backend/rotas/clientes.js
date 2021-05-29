const express = require('express');
const multer = require ('multer');
const router = express.Router();
const Cliente = require('../models/cliente');

const MIME_TYPE_EXTENSAO_MAPA = {
  'image/png' : 'png',
  'image/jpeg' : 'jpg',
  'image/jpg' : 'jpg',
  'image/bmp': 'bmp'
}


const armazenamento = multer.diskStorage({
  destination: (req, res, callback) => {
    let e = MIME_TYPE_EXTENSAO_MAPA[file.mimetype] ? null : new Error ('Mime Type Invalido');
    callback(e, "backend/imagens")
  },
  filename: (req, file, callback) => {
    const nome = file.originalname.toLowerCase().split(" ").join("-");
    const extensao = MIME_TYPE_EXTENSAO_MAPA[file.mimetype];
    callback(null, `${nome}-${Date.now()}.${extensao}`);
  }
})

//http://localhost:3000/api/clientes/fweafwea98fwea
router.delete('/:id', (req, res) => {
  Cliente.deleteOne({ _id: req.params.id })
    .then((resultado) => {
      console.log(resultado);
      res.status(200).end();
    });
});


router.post('', multer({storage: armazenamento}).single('imagem'), (req, res, next) => {
  const cliente = new Cliente({
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email
  });
  cliente.save().then((clienteInserido) => {

    res.status(201).json({
      id: clienteInserido._id,
      mensagem: "Cliente inserido"
    });
  });
});


router.get('', (req, res, next) => {
  Cliente.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK",
      clientes: documents
    });
  });
});

//http://localhost:3000/api/clientes/609fe4de2ef7a32cc21b9605
//{id: 609fe4de2ef7a32cc21b9605}
//req.params.id
router.get('/:id', (req, res) => {
  Cliente.findById(req.params.id).then(cli => {
    if (cli) {
      res.status(200).json(cli);
    }
    else {
      res.status(404).json({ mensagem: "Cliente não encontrado!" });
    }
  });
});

router.put('/:id', (req, res) => {
  const cliente = new Cliente({
    _id: req.params.id,
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email
  });
  Cliente.updateOne({ _id: req.params.id }, cliente).then((resultado) => {
    res.status(200).json({ mensagem: "Atualização realizada com sucesso" });
  });
});

module.exports = router;
