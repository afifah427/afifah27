var createError = require('http-errors');
var session = require('express-session');
var flash = require('express-flash')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('cookie-parser');
var db = require('./routes/database');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: '123@123abc',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000},
}),
)
app.use(flash()) // Impor Library Flash
//Menampilkan Data
app.get('/', function (req, res, next) {
  res.render('index', { title: 'User Form' })
});
//POST DATA atau INSERT DATA
app.post('/user_form', function (req, res, next) {
  var name = req.body.name
  var email = req.body.email
  var message = req.body.message
  var sql = `INSERT INTO users (name, email, message, created_at)
            VALUES ("${name}", "${email}", "${message}", NOW())`
  db.query(sql, function (err, result){
    if (err) throw err
    console.log('Row Has Been Updated');
    req.flash('success', 'data nya');
    res.redirect('/')
  });

})

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

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

app.listen(7676, function () {
  console.log('Berjalan di Port 7676...')
})

module.exports = app;
