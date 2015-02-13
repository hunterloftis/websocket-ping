var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var PORT = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connect', function(socket){
  console.log('connection established');
});

http.listen(PORT, function(err) {
  if (err) throw err;
  console.log('listening on *:' + PORT);
});
