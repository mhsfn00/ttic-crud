const express = require('express');
const app = express();
const PORT = 8080;
// Para que o express consiga ler req.body
app.use(express.json());

// Importando as rotas de User
const userRoutes = require('./routes/userRoutes.js');

// Associando as rotas de usuário a /user
app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Endereço da API http://localhost:${PORT}`);
});