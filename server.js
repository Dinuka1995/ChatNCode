const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const router 	   = express.Router();
const port 	   = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

require('./routes')(router);
app.use('/chatncode/v1', router);
//app.use(express.static('public'));

app.use('/css',express.static('css'));
app.use('/vender',express.static('vender'));
app.use('/fonts',express.static('fonts'));
app.use('/images',express.static('images'));
app.use('/js',express.static('js'));
//app.use(viewengine,'pug');




users =[];
connections=[];

server=app.listen(port);
var io= require('socket.io').listen(server);
//socket.io instantiation
//const io=require("socket.io")(server)

//listen on every connection
/*io.on('connection',(socket)=> {
  console.log('New User Connected');
})*/


app.use('/jquery',express.static('jquery'));


io.sockets.on('connection',function(socket){
  connections.push(socket);
  console.log('Connected : %s sockets connected',connections.length);

  //Disconnect

  socket.on('disconnect',function(data){

    connections.splice(connections.indexOf(socket),1);
    console.log('Disconnected : %s sockets connected',connections.length);
  });
  // send new message
  socket.on('send message',function(data){
    //console.log(data);
    io.sockets.emit('new message',{msg:data});
  });

  socket.on('chat message',function(data1){
    //console.log(data);
    io.sockets.emit('new_chat_message',{msg:data1});
  });


});



console.log('App Runs on ${port}');


/*
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
res.render('index', { title: 'Express',user: user.first_name });
*/
