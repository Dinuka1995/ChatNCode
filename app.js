var express= require('express');
var app=express();
var bodyParser= require('body-parser'); // for get data from post
var mysql= require('mysql'); // import mysql


// create a connection with mysql

var db= mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'users1'

});

// connect
db.connect(function(err){
  if(err){
    console.log("there is an err :"+err);
    //throw err;
  }else {
    console.log("you have been connected to the database!");
  }
});

const bcrypt = require('bcrypt'); // encript passwords

app.use(bodyParser.urlencoded({extended : true}));

app.set('view engine','ejs');

app.use('/css',express.static('css'));
app.use('/vender',express.static('vender'));
app.use('/fonts',express.static('fonts'));
app.use('/images',express.static('images'));
app.use('/js',express.static('js'));

app.listen(3001); // listen at 3000
console.log('Server is listenning for a client');
app.get('/',function(req,res){

  res.render('index');

});

app.get('/index.html',function(req,res){

  res.render('index');

});



app.get('/signup',function(req,res){

  res.render('signup');

});

app.post('/insertdata',function(req,res){


  var name=req.body.name;
  var email=req.body.email;
  var username= req.body.username;


  //console.log('your name is :'+name);



  // get and encrypt password



  let hash = bcrypt.hashSync(""+req.body.password, 10);
  //res.send('your password is :'+hash);
  data={name:name,email:email,password:hash,username:username};
  var sql='INSERT INTO users SET ?' ;

  db.query(sql,data,function(err,result){
    if(err){
      console.log('database creation err: '+err);
    }else{
      res.render('index');
      console.log('inserted into the database!');

    }
  });



  // if(bcrypt.compareSync('ssss', hash)) {
  //   console.log('password matched!');
  //   db.query(sql,data,function(err,result){
  //     if(err){
  //       console.log('database creation err: '+err);
  //     }else{
  //       res.render('index');
  //       console.log('inserted into the database!');
  //
  //     }
  //   });
  // } else {
  //
  //   console.log('password not matched!');
  // }





  //var name= req.body.name;
  //console.log('name '+data);
  //res.render('index');

});
//
// app.get('/profile/:name',function(req,res){
//   res.render('profile',{name:req.params.name});
// });
//
// app.get('/profile/:id',function(req,res){
//
//   res.send('This is the profile '+req.params.id);
//
// });

app.get('/signup.html',function(req,res){

  res.render('signup');

});
