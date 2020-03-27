const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentsController');
const ProfineController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// LOGIN
routes.post('/sessions', SessionController.create);

// ONG
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

// ONG
routes.get('/profile', ProfineController.index);


// CASOS
routes.get('/incidents', IncidentsController.index);
routes.post('/incidents', IncidentsController.create);
routes.delete('/incidents/:id', IncidentsController.delete);


module.exports = routes;