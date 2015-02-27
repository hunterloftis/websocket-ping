var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var sockjs = require('sockjs').createServer();
var WebSocketServer = require('ws').Server

var PORT = process.env.PORT || 3000;
var DYNO = process.env.DYNO || 'unnamed.dyno';

sockjs.installHandlers(server, { prefix: '/sockjs' });

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

server.listen(PORT, function(err) {
  if (err) throw err;
  console.log('listening on *:' + PORT);
});

var wss = new WebSocketServer({
  server: server,
  path: '/vanilla'
});

wss.on('connection', function(ws) {
  console.log('websocket connection open');
  ws.send(DYNO);

  ws.on('close', function() {
    console.log('websocket connection closed');
  })
});
