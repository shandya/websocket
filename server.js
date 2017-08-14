var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

server.listen(3336);

console.log("Socket server is running");

var clientCounter = 0;
var readyClient = 0;

io.on('connection', function(socket) {
	clientCounter++;

	console.log('new connection: ' + socket.id);
	console.log('totalClient: ' + clientCounter);

	socket.on('video', function(data) {
		socket.broadcast.emit('video', data);
	});

	socket.on('sync', function(data) {
		readyClient++;
		console.log('Client is ready.');
		console.log('Ready Clients: ' + readyClient + '/' + clientCounter);
	
		if (readyClient == clientCounter) {
			console.log('Play Video');

			data.serverTime = new Date().getTime();

			io.emit('sync', data);
			readyClient = 0;
		}	
	});

	socket.on('disconnect', function() { 
		clientCounter--; 

		console.log('connection disconnected.');
		console.log('totalClient: ' + clientCounter);
	});
});
