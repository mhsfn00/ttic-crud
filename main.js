const express = require('express');
const app = express();
const dbLocal = require("db-local");
const { Schema } = new dbLocal({ path: "./databases" });
const PORT = 5000;

// Criando model User para dbLocal
const User = Schema("User", {
  // dbLocal (assim como mongodb) adiciona o campo _id automaticamente
  username: { type: String, default: "Customer" },
  tag: { type: String, default: "CustomerTag" },
  bag: { type: Array, default: ["Nothing"] }
});

// Para que o express consiga ler req.body
app.use(express.json());

// POST
app.post('/user', async (req, res) => {
  try {
    const newUser = req.body;
    const createdUser = await User.create({
      username: newUser.username,
      tag: newUser.tag,
      bag: newUser.bag
    }).save();

    res
      .status(201)
      .json({ message: 'Novo usuário salvo', novoUsuario: createdUser});
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Erro ao salvar a pessoa', detalhes: err.message });
  }
});

// GET
app.get('/user', async (req, res) => {
  try {
    const allUsers = await User.find();
    res
      .status(200)
      .json({ usuarios: allUsers });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Erro ao salvar a pessoa', detalhes: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Endpoints começam com esse endereço -> http://localhost:${PORT}`);
});
