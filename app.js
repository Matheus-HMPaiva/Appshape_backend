// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*'
}))
// Conectar ao MongoDB
mongoose.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
mongoose.connection.once('open', () => {
  console.log('Conectado ao MongoDB');
});

// Middleware para análise de JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Iniciar o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
