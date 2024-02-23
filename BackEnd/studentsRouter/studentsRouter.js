const express = require('express');
const route = express.Router();
const studentsController = require('../studentController/studentController');

route.post('/register',studentsController.register);
route.post('/login',studentsController.login);
route.put('/update/:id',studentsController.updateValue);
route.delete('/delete/:id',studentsController.deleteData);

module.exports = route;