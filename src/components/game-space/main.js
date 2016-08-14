
import space        from './classes/space';
import Buran from './classes/Buran';

let socket = io();

let clientId = '';
let ships = {};

socket.on('gameInit', function(data){
    clientId = data.id.slice(10);

    ships[clientId] = new Buran();
    console.log(ships)
});



// Ship controller

let flyForwardState = false;

document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 37:
            ships[clientId].wheelLeft(); break;
        case 39:
            ships[clientId].wheelRight(); break;
        case 38:
            if(!flyForwardState){
                ships[clientId].flyForward();
                flyForwardState = true;
            } break;
        case 32:
            if(!ships[clientId].fireState) {
                ships[clientId].fire();
                ships[clientId].fireState = true;
            } break;
    }
});

document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
        case 37:
        case 39:
            ships[clientId].wheelCenter(); break;
        case 38:
            ships[clientId].flyStop();
            flyForwardState = false; break;
        case 32:
            ships[clientId].fireState = false; break;
    }
});