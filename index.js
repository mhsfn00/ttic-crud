const express = require('express');
const app = express();
const PORT = 8080;
// Para que o express consiga ler req.body
app.use(express.json());

// Importando as rotas de User
const userRoutes = require('./routes/userRoutes.js');

// Adicionando as rotas do usuário
app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Endereço do servidor http://localhost:${PORT}`);
});