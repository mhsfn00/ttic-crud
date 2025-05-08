const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.route('/')
  .get(userController.getUsers)
  .post(userController.postUser)
  .put(userController.putUser)
  .delete(userController.deleteUser)