const User = require('../models/User.js');

// 200 OK
// 201 Informação criada (POST)
// 500 Erro interno servidor
// 400 Erro na requisição (faltou informação)

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();    
        res.status(200).json({ result: allUsers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }     
}

const createUser = async (req, res) => {
    try {
        const { newUser } = req.body;
        const newUserModel = User.create({
            username: newUser.username,
            tag: newUser.tag,
            createdAt: newUser.createdAt || new Date().toISOString(),
        });
        
        const databaseResponse = await newUserModel.save();
        res.status(201).json({ result: databaseResponse });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { 
    getAllUsers,
    createUser
}