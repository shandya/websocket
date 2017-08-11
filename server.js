
var express = require('express');

var app = express();
var server = app.listen(4009);
var clientlist = {};

app.use(express.static('public'));

console.log("Socket server is running");

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
	console.log('new connection: ' + socket.id);
	console.log(clientlist);

	clientlist.push(socket.id);

	socket.on('video', function(data) {
		socket.broadcast.emit('video', data);
	});
}