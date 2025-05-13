const express = require('express');
const router = express.Router();
const userController = require('../controller/userController.js');

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

router.route('/getById')
    .get(userController.getById);

module.exports = router;