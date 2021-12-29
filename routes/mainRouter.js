var express = require('express');
var mainRouter = express.Router();
const mainController = require('../controllers/mainController');

/* Ruta principal */
mainRouter.get('/', mainController.index);

module.exports = mainRouter;
