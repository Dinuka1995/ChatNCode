const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
var connection = require('../config/db');

exports.register = function(username,email,password,callback) {

  var data;
  //console.log(username);
  bcrypt.hash(password, null, null, function(err, hash) {

    data={
      "username":username,
      "email":email,
      "password":hash
    }
    connection.query('INSERT INTO user SET ?',data, function (error, results, fields) {
    if (error) {
      console.log("error ocurred",error);
      callback({'response':"Error occured",'res':false});
    }else{
      callback({'response':"user registered sucessfully",'res':true});
    }
    });
  });


}
