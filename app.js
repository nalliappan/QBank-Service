var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require('cors');
//const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');
const config = require('./config');
const swaggerDoc = require('./swaggerDoc');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var publishersRouter = require('./routes/publishers');
var schoolsRouter = require('./routes/schools');
var booksRouter = require('./routes/books');
var subjectsRouter = require('./routes/subjects');
var qTypeRouter = require('./routes/questionTypes');

var app = express();
const expressSwagger = require('express-swagger-generator')(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const whiteList = [
  '/users/login',
  '/swagger',
  '/swagger-ui',
  '/api-docs'
]

app.use(function(req, res, next) {
  if(req.headers.authorization || req.originalUrl === '/' || whiteList.indexOf(req.originalUrl) !== -1){
    next();
  }else{
    next(createError(401));
  }
});

app.use('/', indexRouter);


//const swaggerDocument = require('./swagger.json');
 
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

swaggerDoc(app);

app.use('/users', usersRouter);
app.use('/publishers', publishersRouter);
app.use('/schools', schoolsRouter);
app.use('/books', booksRouter);
app.use('/subjects', subjectsRouter);
app.use('/question-types', qTypeRouter);

mongoose.connect(config.db.uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    dbName: 'testGen'
});

//const db = mongoose.Connection;

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

mongoose.connection.once('open', () => {console.log('Database Connected.')})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

let options = {
  swaggerDefinition: {
      info: {
          description: 'This is a sample server',
          title: 'Swagger',
          version: '1.0.0',
      },
      host: 'localhost:8091',
      basePath: '/v1',
      produces: [
          "application/json",
          "application/xml"
      ],
      schemes: ['http', 'https'],
      securityDefinitions: {
          JWT: {
              type: 'apiKey',
              in: 'header',
              name: 'Authorization',
              description: "",
          }
      }
  },
  basedir: __dirname, //app absolute path
  files: ['./routes/**/*.js'] //Path to the API handle folder
};

expressSwagger(options)

module.exports = app;
