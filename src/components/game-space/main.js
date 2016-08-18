
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

socket.on('updateClientPosition', function(data){
    if (data.sessionId == YOUR_SESSION_ID) return;
    ships[data.sessionId].setPosition(data.posX, data.posY, data.angle)
});

setInterval(() => {
    socket.emit('updateClientPosition', {
        sessionId: YOUR_SESSION_ID,
        posX: ships[YOUR_SESSION_ID].posX,
        posY: ships[YOUR_SESSION_ID].posY,
        angle: ships[YOUR_SESSION_ID].angle,
    });
}, 500);


// Ship controller

let keyStates = {
    left: false,
    right: false,
    up: false,
    down: false,
    space: false,
};

document.addEventListener('keydown', (e) => {
    e.preventDefault();

    switch (e.keyCode) {
        case 37:
            if (keyStates.left) return;
            ships[YOUR_SESSION_ID].wheelLeft();
            keyStates.left = true;
            break;
        case 39:
            if (keyStates.right) return;
            ships[YOUR_SESSION_ID].wheelRight();
            keyStates.right = true;
            break;
        case 38:
            if (keyStates.up) return;
            ships[YOUR_SESSION_ID].flyForward();
            keyStates.up = true;
            break;
        case 32:
            if (ships[YOUR_SESSION_ID].fireState) return;
            ships[YOUR_SESSION_ID].fire();
            ships[YOUR_SESSION_ID].fireState = true;
            break;
        case 40:
    }
});

document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
        case 37:
        case 39:
            ships[YOUR_SESSION_ID].wheelCenter();
            socket.emit('wheelCenter', {sessionId: YOUR_SESSION_ID});
            keyStates.left = false;
            keyStates.right = false;
            break;
        case 38:
            ships[YOUR_SESSION_ID].flyStop();
            keyStates.up = false; break;
        case 32:
            ships[YOUR_SESSION_ID].fireState = false; break;
    }
});