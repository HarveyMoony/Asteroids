
"use strict";

const fs = require('fs');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let activeSessions = [];

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

io.on('connection', function(socket){

    let sessionId = socket.id.slice(-6);

    activeSessions.push(sessionId);

  // Emit
    io.emit('clientСonnect', {
        activeSessions: activeSessions,
        id: sessionId
    });

  // Listen
    socket.on('disconnect', function(data) {
        activeSessions.splice(activeSessions.indexOf(sessionId), 1);

        io.emit('clientDisconnect', {
            activeSessions: activeSessions,
            id: sessionId
        })
    });

    socket.on('wheelCenter', function(data) {
        io.emit('wheelCenter', {sessionId: data.sessionId})
    });
    
    socket.on('wheelLeft', function(data) {
        io.emit('wheelLeft', {sessionId: data.sessionId})
    });

    socket.on('wheelRight', function(data) {
        io.emit('wheelRight', {sessionId: data.sessionId})
    });
    
    

});

http.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
});