const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

const MONGO_URI = process.env.DB_URL;
const clientOptions = {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true
    }
};
mongoose
  .connect(MONGO_URI, clientOptions)
  .then(() => console.log('Conectado ao MongoDB Atlas com sucesso!'))
  .catch((err) =>
    console.error('Erro de conexão com o MongoDB Atlas:', err)
  );

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
const Pessoa = require('./Pessoa.js');

// POST
app.post('/addPessoa', async (req, res) => {
  try {
    const { pessoaInfo } = req.body;

    // All attributes on Pessoa.js are required: true, might render this check unnecessary
    if (!pessoaInfo.nome || !pessoaInfo.dataNascimento || !pessoaInfo.profissao) {
      return res.status(400).json({ 
            error: 'É necessário incluir nome, profissao e data de nascimento' 
        });
    }

    const novaPessoa = new Pessoa({ pessoaInfo });
    await novaPessoa.save();

    res
      .status(201)
      .json({ message: 'Nome salvo com sucesso!', nome: novoNome });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Erro ao salvar a pessoa', detalhes: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
