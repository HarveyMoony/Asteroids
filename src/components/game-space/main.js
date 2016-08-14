
import _        from 'underscore';

import space    from './classes/space';
import Buran    from './classes/Buran';


let socket = io();

let YOUR_SESSION_ID = '';
let ships = {};

socket.on('clientСonnect', function(data){

    if (!YOUR_SESSION_ID) YOUR_SESSION_ID = data.id;

    // Добавление объектов подключенных сессий
    let newSessions = _.difference(data.activeSessions, Object.keys(ships));
    newSessions.forEach((sessionId) => {
        // console.log(sessionId);
        ships[sessionId] = new Buran(sessionId)
    })
});

socket.on('clientDisconnect', function(data){

    // Удаление объектов отключенных сессий
    let oldSessions = _.difference(Object.keys(ships), data.activeSessions);
    oldSessions.forEach((sessionId) => {
        ships[sessionId].destroy();
        delete ships[sessionId];
    })
});

socket.on('wheelCenter', function(data){
    if (data.sessionId == YOUR_SESSION_ID) return;
    ships[data.sessionId].wheelCenter()
});

socket.on('wheelLeft', function(data){
    if (data.sessionId == YOUR_SESSION_ID) return;
    ships[data.sessionId].wheelLeft()
});

socket.on('wheelRight', function(data){
    if (data.sessionId == YOUR_SESSION_ID) return;
    ships[data.sessionId].wheelRight()
});



// Ship controller

let flyForwardState = false;

document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 37:
            ships[YOUR_SESSION_ID].wheelLeft();
            socket.emit('wheelLeft', {sessionId: YOUR_SESSION_ID}); break;
        case 39:
            ships[YOUR_SESSION_ID].wheelRight(); break;
        case 38:
            if(!flyForwardState){
                ships[YOUR_SESSION_ID].flyForward();
                flyForwardState = true;
            } break;
        case 32:
            if(!ships[YOUR_SESSION_ID].fireState) {
                ships[YOUR_SESSION_ID].fire();
                ships[YOUR_SESSION_ID].fireState = true;
            } break;
    }
});

document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
        case 37:
        case 39:
            ships[YOUR_SESSION_ID].wheelCenter();
            socket.emit('wheelCenter', {sessionId: YOUR_SESSION_ID}); break;
        case 38:
            ships[YOUR_SESSION_ID].flyStop();
            flyForwardState = false; break;
        case 32:
            ships[YOUR_SESSION_ID].fireState = false; break;
    }
});