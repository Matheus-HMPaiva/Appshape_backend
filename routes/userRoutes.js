// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Rota para criar um novo usuário
router.post('/', UserController.createUser);

module.exports = router;