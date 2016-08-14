
import Konva from 'konva';

function stage() {

    var stage = new Konva.Stage({
        container: 'space',
        width: 1200,
        height: 720
    });

    var layer = new Konva.Layer();
    stage.add(layer);


    module.exports = {
        stage: stage,
        layer: layer
    };
}

export default stage();