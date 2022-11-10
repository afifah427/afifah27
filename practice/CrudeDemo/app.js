var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { urlencoded } = require('express');
var pool = require("./config");

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// var jsonParser = bodyParser.json();
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/insert', (req, res) => {
  res.render('insert')
});

// app.post('/save', (req, res) => { 
//     let data = {name: req.body.name, email: req.body.email, contact : req.body.contact, designation : req.body.designation};
//     let sql = "INSERT INTO employee SET ?";
//     pool.query(sql, data,(err, results) => {
//     if(err) throw err;
//     res.json({"ResponseCode":"1","ResponseMessage":"success","data":"Data Inserted Successfully!"});
//     });
// });

app.post('/save', function(req,res){

  var name = req.body.name;
  var email = req.body.email;
  var contact = req.body.contact;
  var designation = req.body.designation;
  pool.query("insert into employee(name,email,contact,designation) values(?,?,?,?) ",[name,email,contact,designation],function(err,rows,fields){
    if (err) {
  console.log('Connection result error: ' + err);
}
    else
    {
      res.json({"ResponseCode":"1","ResponseMessage":"success","data":"Data Inserted Successfully!"});

    }
  });
  
})


app.get('/show',function(req,res) {
  pool.query("select * from employee", function (err, result) {
    if (err) throw err;
    else {
      obj = {print: result};
      console.log(obj);

      res.render("show", obj);
    }
  })
})



// app.get('/crud', (req, res) => {
//   res.render('insert')
// });

var edit=0;
app.get('/update',function(req,res) {
  pool.query("select * from employee", function (err, result) {
    if (err) throw err;
    else {
      if (req.query.id != '') {
        pool.query("SELECT * FROM employee where id = ? ", [req.query.id], function (error, rows) {
          if (!!error) {
            console.log('edit Error' + error);
          } else {
            console.log('edit ok');
            edit = rows;
          }
        });
      }
      // data = {print:result};
      obj = {print: result,req: edit};
      console.log(obj);
      res.render("update", obj);
    }

  })
})

app.post('/updatesave',function(req,res){
  var id = req.body.id;
  var name = req.body.name;
  var email = req.body.email;
  var contact = req.body.contact;
  var designation = req.body.designation;
  


  // res.send(id+name+email+contact);
  pool.query("UPDATE employee set name=?, email=?,contact=?,designation=? where id=?",[name,email,contact,designation,id],function(err,rows,fields){

    if(!!err)
    {
      console.log('Error' ,+err);
    }
    else
    {
      console.log('ok');
      res.json({"ResponseCode":"1","ResponseMessage":"Data Updated Successfully","data":rows});
    }
  });
})

app.get('/delete',function(req,res){

  var id = req.query.id;

  pool.query("delete from employee where id=?",[id],function(err,rows,fields){

    if(!!err)
    {
      console.log('Error' ,+err);
    }
    else
    {
      console.log("record deleted");
      return res.redirect('/show');
      //res.json({"ResponseCode":"1","ResponseMessage":"Record deleted successfully!","data":rows});
    }

  });
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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


app.listen(3000);
console.log('berjalan di port 3000')
module.exports = app;
