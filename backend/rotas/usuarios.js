const express = require ( 'express');
const Usuario = require ('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

//host:porta/signup: NOK
//host:porta/api/usuarios/signup: OK
router.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, 10).
  then(hash => {
    const usuario = new Usuario({
      email: req.body.email,
      password: hash
    })
    usuario.save()
    .then( result => {
      res.status(201).end();
    })
    .catch (err => {
      console.log(err);
      res.status(500).end();
    });
  })
});

router.post('/login', (req, res) => {
  let user;
  Usuario.findOne({email: req.body.email}).then(u => {
    user = u;
    if (!u){
      return res.status(401).json({
        mensagem: 'email invalido'
      })
    }
    return bcrypt.compare(req.body.password, u.password)
  })
  .then (result => {
    if (!result){
      return res.status(401).json({
        mensagem: 'senha invalida'
      })
    }
    const token = jwt.sign(
      {email: user.email, id: user._id},
      process.env.JWT_PASSWORD,
      {expiresIn: '1h'}
    )
    res.status(200).json({token: token});

  })
  .catch (erro => {
    console.log(erro);
    return res.status(401).json({
      mensagem: 'Login falhou'
    });
  })
})




module.exports = router;

