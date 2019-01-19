const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
var connection = require('../config/db');

exports.joinSession = function(token_owner,token_joiner,callback){
  var logData={
    "user1":token_owner,
    "user2":token_joiner,
  }
  connection.query('INSERT INTO log SET ?',logData, function (session_error, session_results, fields) {
  if (session_error) {
    console.log("error ocurred",session_error);
    callback({'response':"Error occured",'res':false});
  }else{
    callback({'response':"join sucessfull",'res':true});
  }
  });

}
