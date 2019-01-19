const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
var connection = require('../config/db');
var path=require('path');

exports.login = function(email,password,res,callback){

  connection.query('SELECT * FROM user WHERE email = ?',[email], function (error, results, fields) {

  if (error) {
    // console.log("error ocurred",error);
    callback({'response':"Error occured",'res':false});
  }else{
    // console.log('The solution is: ', results);
    if(results.length >0){
      bcrypt.compare(password,results[0].password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          jwt.sign({results},'SuperSecRetKey', { expiresIn: 60 * 60* 24}, (err, token) => {
            var session_Data={
              "session_id":token.substr(token.length - 6),
              "user_id":results[0].user_id,
              "jwttoken":token
            }
            connection.query('INSERT INTO session SET ?',session_Data, function (session_error, session_results, fields) {
            if (session_error) {
              console.log("error ocurred",session_error);
              callback({'response':"Error occured",'res':false});
            }else{
              res.sendFile(path.join(__dirname,"../editor.html"));
              //callback({'response':"login sucessfull",'res':true,'token': token,'sessionID':token.substr(token.length - 6)});
            }
            });

          });
        }
        else {
          callback({'response':"Email and password does not match",'res':false});
        }
      });
    }else{
      callback({'response':"Email does not exits",'res':false});
    }
  }
  });
}
