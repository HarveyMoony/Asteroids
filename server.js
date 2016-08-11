
"use strict";

const fs = require('fs');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('port', process.env.port || 5000);
app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

app.get('/game', function(req, res) {
    res.sendFile(__dirname + '/dist/game.html');
});

http.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
});