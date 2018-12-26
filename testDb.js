var express=require('express');
var mysql= require('mysql');

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


var newApp= express();

// create Db
newApp.get('/createdb',function(req,res){
  let sql='CREATE DATABASE users2';
  db.query(sql, function(err,result){
    if(err){
      console.log('database creation err: '+err);
    }else{
      res.send('Created the database!');
      console.log('Database created!');

    }
  });
});

newApp.get('/createUserstb',function(req,res){
  var select= 'USE users1';
  //var sql='CREATE TABLE users ';
});

newApp.listen(3001);
console.log("Server listening for clients");
