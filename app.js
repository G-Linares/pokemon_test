var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const port = process.env.PORT || 3000;

var mainRouter = require('./routes/mainRouter');


var app = express();

// declaro a EJS como el view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

app.use('/', mainRouter);


// captura el error 404 y lo envia al error handler de abajo
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set a los locales, solo da errores en development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // renderiza desde entry point la pagina de error
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port,() => {
  console.log(`Escuchando el puerto ${port}`);
})