define('buranCtrl', ['buran'], function(buran) {

    buran.init();

    $(document).on('keydown', function(e) {
        if(e.keyCode == '37') {
            buran.turnLeft.start();
        }
        if(e.keyCode == '39') {
            buran.turnRight.start()
        }
        if(e.keyCode == '38') {
            buran.flyForward.start()
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
            buran.flyForward.stop()
        }
    });

});