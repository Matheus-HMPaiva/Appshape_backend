// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Rota para criar um novo usuário
router.post('/signup', UserController.createUser);

router.post('/login', UserController.loginUser);

module.exports = router;
