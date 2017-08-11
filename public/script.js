var socket;
var video = document.getElementsByTagName("video")[0],
	notification = document.getElementById('notification');

var data = {};

var rows = 3,
	cols = 3,
	x = 1, //default value
	y = 1; //default value;

var videoWidth = document.documentElement.clientWidth * rows,
	videoHeight = document.documentElement.clientHeight * cols
	videoOffsetWidth = 0,
	videoOffsetHeight = 0;

video.height = videoHeight;
video.width = videoWidth;

socket = io.connect('http://localhost:3106');
socket.on('video', videoCommand);

document.addEventListener("DOMContentLoaded", init, false);


function videoCommand(data) {
	switch(data.type) {
		case 'play': 
			video.play();
			break;
		case 'pause':
			video.pause();
			break;
		case 'stop':
			video.pause();
			video.currentTime = 0;
			break;
		case 'restart':
			video.pause();
			video.currentTime = 0;
			video.play();
			break;
		default :
			console.log('unidentified event');
	}
}

function init () {

	document.getElementById('play').addEventListener('click', function() {
		video.play();

		data.type = 'play';
		socket.emit('video', data);

	});

	document.getElementById('pause').addEventListener('click', function() {
		video.pause();

		data.type = 'pause';
		socket.emit('video', data);
	});

	document.getElementById('stop').addEventListener('click', function() {
		video.pause();
		video.currentTime = 0;

		data.type = 'stop';
		socket.emit('video', data);
	});

	document.getElementById('restart').addEventListener('click', function() {
		video.pause();
		video.currentTime = 0;
		video.play();

		data.type = 'restart';
		socket.emit('video', data);
	});

    document.getElementById('video').addEventListener('ended', function() {
    	console.log('video ended');

    	// socket.emit('sync', 'ready');
    },false);


	document.getElementById('submit').addEventListener('click', function() {

		var row = document.getElementById("row").value;
		var col = document.getElementById("col").value;

		if (isNaN(row) || row > rows) {
			showNotification('Invalid Row');
			return;
		}

		if (isNaN(col) || col > cols) {
			showNotification('Invalid Col');
			return;
		}

		y = row;
		x = col;

		videoOffsetWidth = (x - 1) * Math.round(video.width / rows);
		videoOffsetHeight = (y - 1) * Math.round(video.height / cols);

		alignVideo();

		showNotification("row: " + row + ", col: " + col);
	});
}

function showNotification(message) {
	notification.innerHTML = message;

	setTimeout(function() {
		notification.innerHTML = "";
	}, 2000);
}

function alignVideo() {
	video.style.marginLeft = -videoOffsetWidth + "px";
	video.style.marginTop = -videoOffsetHeight + "px";
}


