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
    const dbResponse = await User.create({
      username: newUser.username,
      tag: newUser.tag,
      bag: newUser.bag
    }).save();

    res.status(201).json({ resultado: dbResponse });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// GET
app.get('/user', async (req, res) => {
  try {
    const allUsers = await User.find();

    res.status(200).json({ resultado: dbResponse });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// PUT
app.put('/user', async (req, res) => {
  try {
    const { userId } = req.body;
    const { newValues } = req.body;

    console.log( userId );
    console.log( newValues );

    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error('Usuário não foi encontrado');
    }
    const dbResponse = await user.update(newValues).save();
    
    res.status(200).json({ resultado: dbResponse });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// DELETE
app.delete('/user', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      throw new Error('id não fornecido');
    }

    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error('Usuário não foi encontrado');
    }
    const dbResponse = await user.remove();
    
    res.status(200).json({ resultado: dbResponse });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Endpoints começam com esse endereço -> http://localhost:${PORT}`);
});
