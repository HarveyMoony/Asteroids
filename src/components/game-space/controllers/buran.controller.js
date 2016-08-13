

import buran from '../classes/buran';

function buranCtrl() {

    buran.init().then(function() {
        buran.flyForwardAnimationInit.start();
    });
    setTimeout(() => {
        buran.init().then(function() {
            buran.flyForwardAnimationInit.start();
        });
    }, 3000)


    var flyForwardState = false;

    $(document).on('keydown', function(e) {
        if(e.keyCode == '37') {
            buran.turnLeft.start();
        }
        if(e.keyCode == '39') {
            buran.turnRight.start()
        }
        if(e.keyCode == '38') {
            if(!flyForwardState){
                buran.flyForward();
                flyForwardState = true;
            }
        }
        if(e.keyCode == '32') {
            if(!buran.fireState) {
                buran.fire();
                buran.fireState = true;
            }
        }
    });

    $(document).on('keyup', function(e) {
        if(e.keyCode == '37') {
            buran.turnLeft.stop();
        }
        if(e.keyCode == '39') {
            buran.turnRight.stop();
        }
        if(e.keyCode == '38') {
            buran.flyStop();
            flyForwardState = false;
        }
        if(e.keyCode == '32') {
            buran.fireState = false;
        }
    });

}

export default buranCtrl();