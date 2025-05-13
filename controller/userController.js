const User = require('../models/User.js');

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
            nome: newUser.nome,
            idade: newUser.idade,
            hobbies: newUser.hobbies,
        });
        const databaseResponse = await newUserModel.save();

        res.status(201).json({ result: databaseResponse });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { updatedUser } = req.body;
        const { username } = updatedUser;

        if (!username) {
            res.status(400).json({ message: 'username não encontrado na requisição'});
        }
        
        const user = await User.findOne({ username: username });

        user.nome = updatedUser.nome ? updatedUser.nome : user.nome;
        user.idade = updatedUser.idade ? updatedUser.idade : user.idade;
        user.hobbies = updatedUser.hobbies ? updatedUser.hobbies : user.hobbies;
        user.save();

        const newUserInfo = await User.findOne({ username: username });

        res.status(200).json({ newUser: newUserInfo });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { username } = req.body;

        const user = await User.findOne({ username: username });
        if (!user) {
            res.status(400).json({ message: 'usuário não foi encontrado' });
        }
        user.remove();

        res.status(200).json({ result: "usuário removido com sucesso" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const { username } = req.body;

        const user = await User.findOne({ username: username });
        if (!user) {
            res.status(400).json({ message: 'usuário não foi encontrado' });
        } else {
            res.status(200).json({ result: user });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { 
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getById
}