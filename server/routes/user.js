const express = require('express');
const userControllers = require('../controllers/user'); 

const router = express.Router();

router.post('/cadastro', userControllers.create); 

router.post('/login', userControllers.login);

router.put('/update', userControllers.update);

router.delete('/delete/:id', userControllers.delete);

module.exports = router;