define('buran', ['konva', 'jquery'], function (konva, jquery) {

    var stage = new Konva.Stage({
        container: 'space',
        width: window.innerWidth,
        height: window.innerHeight
    });

    // add canvas element
    var layer = new Konva.Layer();
    stage.add(layer);

    var im = {};

    Konva.Image.fromURL('img/buran-32.png', function(image){
        im = image;
        image.width(32);
        image.height(32);
        image.x(100);
        image.y(100);
        image.offset({
            x: 16,
            y: 16
        });
        layer.add(image);
        layer.draw();
    });

    layer.draw();

    $(document).on('keydown', function(e) {
        if(e.keyCode == '37') {
            im.rotate(-5);
            layer.draw();
        }
        if(e.keyCode == '39') {
            im.rotate(5);
            layer.draw();
        }
    });

});

    //var drawingCanvas = document.getElementById('space');
    //
    //if(drawingCanvas && drawingCanvas.getContext) {
    //    var ctx = drawingCanvas.getContext('2d');
    //
    //    var img = new Image();
    //    var time = new Date();
    //    img.src = 'img/buran-32.png';
    //    ctx.rotate( ((2*Math.PI)/60000)*time.getMilliseconds() );
    //    img.onload = function() {
    //        ctx.drawImage(img, 400, 300);
    //    };
    //
    //    setTimeout(function() {
    //        ctx.clearRect(400,305,50,50);
    //    }, 100)
    //
    //}

//    paper.install(window);
//    paper.setup('space');
//
//    var raster = new Raster('img/buran-32.png');
//
//// Move the raster to the center of the view
//    raster.position = paper.view.center;
//
//    function onKeyDown(event) {
//        if (event.key == 'left') {
//            // Scale the path by 110%:
//            raster.rotate(-5);
//
//            // Prevent the key event from bubbling
//            return false;
//        }
//
//        if (event.key == 'right') {
//            // Scale the path by 110%:
//            raster.rotate(5);
//
//            // Prevent the key event from bubbling
//            return false;
//        }
//    }
