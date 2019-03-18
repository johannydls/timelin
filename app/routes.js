const express = require('express');

const routes = express.Router();

const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');

//Rotas Users
routes.get('/users', UserController.list);
routes.post('/users', UserController.create);
routes.get('/users/:id', UserController.listById);
routes.get('/users/email/:email', UserController.listByEmail);
routes.post('/login', UserController.authenticate);

//Rotas Eventos
routes.get('/events', EventController.list);
routes.post('/events', EventController.create);
routes.get('/events/:idUser', EventController.listByUserId);
routes.delete('/events/:id', EventController.delete);

module.exports = routes;