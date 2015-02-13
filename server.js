var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sockjs = require('sockjs').createServer();

var PORT = process.env.PORT || 3000;

sockjs.installHandlers(http, { prefix: '/sockjs' });

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connect', function(socket){
  console.log('socket.io connection established');
});

sockjs.on('connection', function(conn) {
  console.log('sockjs connection established');
});

http.listen(PORT, function(err) {
  if (err) throw err;
  console.log('listening on *:' + PORT);
});
