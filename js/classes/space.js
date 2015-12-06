
define('space', ['konva', 'jquery', 'app'], function(konva, jquery, app) {

    var bkg = new Image();
    bkg.onload = function() {
        var backgroundImage = new Konva.Image({
            x: 0,
            y: 0,
            width: 1920,
            height: 1080,
            image: bkg
        });
        console.log('space');
        app.layer.add(backgroundImage);
        backgroundImage.setZIndex(0);
        app.layer.draw();
    };

    bkg.src = 'img/space_bkg.jpg';

});