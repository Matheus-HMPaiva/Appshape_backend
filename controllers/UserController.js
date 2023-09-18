// controllers/UserController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async createUser(req, res) {
    try {
      const { nome, email, senha } = req.body;
  
      // Verificar se o usuário já existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ erro: 'Usuário já cadastrado' });
      }
  
      // Criptografar a senha antes de salvar
      const hashedSenha = await bcrypt.hash(senha, 10);
  
      // Criar um novo usuário com a senha criptografada
      const newUser = new User({
        nome,
        email,
        senha: hashedSenha
      });
  
      await newUser.save();
  
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  },

  async loginUser(req, res) {
    try {
      const { email, senha } = req.body;

      // Verificar se o usuário existe
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ erro: 'Credenciais inválidas' });
      }

      // Verificar a senha
      if (!senha) {
        return res.status(400).json({ erro: 'Senha não fornecida' });
      }

      console.log("🚀 ~ file: UserController.js:48 ~ loginUser ~ senha:", senha)
      console.log("🚀 ~ file: UserController.js:49 ~ loginUser ~ user.senha:", user.senha)
      const senhaValida = await bcrypt.compare(senha, user.senha);
      if (!senhaValida) {
        return res.status(401).json({ erro: 'Credenciais inválidas' });
      }

      // Gerar token de autenticação
      const token = jwt.sign({ userId: user._id }, 'segredo-secreto', { expiresIn: '1h' });

      // Armazenar o token no usuário
      user.token = token;
      await user.save();

      return res.json({ token });
    } catch (error) {
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }
};
