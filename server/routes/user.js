const express = require('express');
const userControllers = require('../controllers/user'); //importa todos os controladores do usuario

const router = express.Router();

router.post('/cadastro', userControllers.createUser); //acessa o createUser dentro do userControllers

router.post('/login', userControllers.login);

router.get('/:id', userControllers.getUser);

module.exports = router;