const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
var connection = require('../config/db');

exports.requestJoin = function(token_joiner,callback){

  if (token) {
  		// verifies secret and checks exp
  		jwt.verify(token, 'SuperSecRetKey', function(err, decoded) {
  			if (err) {
          callback({'response':"Failed to authenticate token",'res':false});
  			} else {
          connection.query('DELETE FROM session WHERE jwttoken = ?',token, function (session_error, session_results, fields) {
          if (session_error) {
            console.log("error ocurred",session_error);
            callback({'response':"Error occured",'res':false});
          }else{
            callback({'response':"logout"});
          }
          });

  			}
  		});

  	} else {
  		// if there is no token
  		// return an error
  		callback({'response':"No token provided",'res':false});
  	}

}
