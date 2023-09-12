// controllers/UserController.js
const User = require('../models/User');

module.exports = {
  async createUser(req, res) {
    try {
      const { nome, email, senha } = req.body;

      // Verificar se o usuário já existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ erro: 'Usuário já cadastrado' });
      }

      // Criar um novo usuário
      const newUser = new User({
        nome,
        email,
        senha
      });

      await newUser.save();

      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }
};
