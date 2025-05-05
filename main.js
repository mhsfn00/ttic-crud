const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Criando o app
const app = express();

// Substitua a string abaixo pela sua string do MongoDB Atlas
const MONGO_URI =
  'mongodb+srv://admin:admin123@cluster0.nmgtsym.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('🔗 Conectado ao MongoDB Atlas com sucesso!'))
  .catch((err) =>
    console.error('Erro de conexão com o MongoDB Atlas:', err)
  );

// Definindo a porta do servidor
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(bodyParser.json());

// Modelo
const Nome = require('./Nome.js');

// Rota
app.post('/addNome', async (req, res) => {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'O nome é obrigatório' });
    }

    const novoNome = new Nome({ nome });
    await novoNome.save();

    res
      .status(201)
      .json({ message: 'Nome salvo com sucesso!', nome: novoNome });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Erro ao salvar o nome', detalhes: err.message });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
