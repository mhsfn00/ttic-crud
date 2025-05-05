const mongoose = require('mongoose');

// Criando o modelo para "Nome"
const nomeSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true, // remove espaços extras
    },
  },
  { timestamps: true }
); // Adiciona automaticamente createdAt e updatedAt

// Criando e exportando o modelo
module.exports = mongoose.model('Nome', nomeSchema);
