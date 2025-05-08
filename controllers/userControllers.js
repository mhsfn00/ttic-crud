const { User } = require('../models/User.js');

const getUsers = async (req, res) => {
    try {
        const allUsers = await User.find();

        res.status(200).json({ resultado: allUsers });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}

const postUser = async (req, res) => {
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
}

const putUser = async (req, res) => {
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
}

const deleteUser = async (req, res) => {
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
}

module.exports = {
    getUsers,
    postUser,
    putUser,
    deleteUser
}