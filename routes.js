var user_login = require('./routes/login');
var user_register = require('./routes/register');
var user_logout = require('./routes/logout');
var user_sessionjoin = require('./routes/joinSession');
var path=require('path');

module.exports = function(app) {

	app.get('/',function(req,res){
		res.sendFile(path.join(__dirname,"./views/index.html"));
	});

	app.get('/home',function(req,res){
		res.sendFile(path.join(__dirname,"./views/index.html"));
	});

	app.get('/signup',function(req,res){
		res.sendFile(path.join(__dirname,"./views/signup.html"));
	});

	//app.get('/', (req, res) => res.end('Welcome to ChatnCode !'));

	app.post('/user/register',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var email=req.body.email;

    user_register.register(username,email,password,function (found) {
         res.json(found);
    });
	});


	app.post('/user/login',function(req,res){
    var email= req.body.email;
    var password = req.body.password;

    user_login.login(email,password,res,function (found) {
    	res.json(found);
    });
	});

  app.post('/user/logout',function(req,res){
    var token= req.body.token;

    user_logout.logout(token,function (found) {
      res.json(found);
    });
  });

	app.post('/user/joinSession',function(req,res){
		var token_owner= req.body.token_owner;
		var token_joiner= req.body.token_joiner;
		user_sessionjoin.joinSession(token_owner,token_joiner,function (found) {
			res.json(found);
		});
	});

	/*app.post('/user/joinRequest',function(req,res){
		var token_owner= req.body.token_owner;
		var token_joiner= req.body.token_joiner;
		user_rqjoin.requestJoin(token_joiner,function (found) {
			res.json(found);
		});
	});*/

};
