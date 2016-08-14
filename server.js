
"use strict";

const fs = require('fs');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let allClients = [];

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

io.on('connection', function(socket){
    console.log('Connected');

    allClients.push(socket);

    socket.on('disconnect', function() {
        console.log('Got disconnect!');

        let i = allClients.indexOf(socket);
        allClients.splice(i, 1);
    });


    io.emit('gameInit', {id: socket.id});

    // socket.on('keyup', function(msg){
    //     io.emit('keyup', msg);
    // });
});

http.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
});