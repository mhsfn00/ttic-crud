const mongoose = require('mongoose');

// Criando o modelo para "Nome"
const pessoaSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    dataNascimento: { type: Date, required: true },
    profissao: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Nome', pessoaSchema);
