const LocalDB = require('db-local');
const { Schema } = new LocalDB({ path: './databases' });

const User = Schema("User", {
    username: { type: String, required: true },
    tag: { type: String, default: "userTag" },
    createdAt: { type: String, default: "YYYY-MM-DD" }
});

module.exports = User;