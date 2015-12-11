define('app', ['konva', 'jquery'], function(konva, jquery) {

    var stage = new Konva.Stage({
        container: 'space',
        width: 1200,
        height: 720
    });

    var layer = new Konva.Layer();
    stage.add(layer);

    return {
        stage: stage,
        layer: layer
    };

    //var $speed= $('.speed'),
    //    $angle = $('.angle');

});