const LocalDB = require('db-local');
const { Schema } = new LocalDB({ path: './databases' });

const User = Schema("User", {
    username: { type: String, required: true },
    nome: { type: String, default: "Usuário" },
    idade: { type: Number, default: 0},
    hobbies: { type: Array, default: []},
    createdAt: { type: String, default: "YYYY-MM-DD" }
});

module.exports = User;