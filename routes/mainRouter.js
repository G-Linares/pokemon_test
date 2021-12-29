const { default: axios } = require('axios');
var express = require('express');
const res = require('express/lib/response');
var mainRouter = express.Router();
const mainController = require('../controllers/mainController');

/* Ruta principal */
mainRouter.get('/', mainController.index);


module.exports = mainRouter;
