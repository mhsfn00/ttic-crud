const dbLocal = require("db-local");
const { Schema } = new dbLocal({ path: "./databases" });

// Criando model User para dbLocal
const User = Schema("User", {
  // dbLocal (assim como mongodb) adiciona o campo _id automaticamente
  username: { type: String, default: "Customer" },
  tag: { type: String, default: "CustomerTag" },
  bag: { type: Array, default: ["Nothing"] }
});

module.exports = { User }