var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sockjs = require('sockjs').createServer();
var WebSocketServer = require('ws').Server

var PORT = process.env.PORT || 3000;
var DYNO = process.env.DYNO || 'unnamed.dyno';

sockjs.installHandlers(http, { prefix: '/sockjs' });

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connect', function(socket){
  console.log('socket.io connection established');
  socket.emit('dyno', { name: DYNO });
});

sockjs.on('connection', function(conn) {
  console.log('sockjs connection established');
  conn.write(DYNO);
});

var server = http.listen(PORT, function(err) {
  if (err) throw err;
  console.log('listening on *:' + PORT);
});

var wss = new WebSocketServer({ server: server });

wss.on('connection', function(ws) {
  console.log('websocket connection open');

  ws.on('close', function() {
    console.log('websocket connection closed');
  })
});
