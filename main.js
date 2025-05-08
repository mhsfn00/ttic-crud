const express = require('express');
const app = express();
const PORT = 5000;
const userRoutes = require('./routes/userRoutes'); // erro:: argument handler must be a function
// Para que o express consiga ler req.body
app.use(express.json());
  
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Endpoints começam com esse endereço -> http://localhost:${PORT}`);
});
