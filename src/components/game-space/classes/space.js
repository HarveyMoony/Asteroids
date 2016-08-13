
import Konva from 'konva';
import stage from '../stage';

function space() {

    // var Matter = require('matter')

    var bkg = new Image();
    bkg.onload = function() {
        var backgroundImage = new Konva.Image({
            x: 0,
            y: 0,
            width: 1200,
            height: 720,
            image: bkg
        });
        stage.layer.add(backgroundImage);
        backgroundImage.setZIndex(0);
        stage.layer.draw();
    };

    bkg.src = '../images/bkg_2400.jpg';

    // Matter.js module aliases
//    var Engine = Matter.Engine,
//        World = Matter.World,
//        Bodies = Matter.Bodies;
//
//// create a Matter.js engine
//    var engine = Engine.create(document.querySelector('#space'));
//
//// create two boxes and a ground
//    var boxA = Bodies.rectangle(400, 200, 80, 80);
//    var boxB = Bodies.rectangle(450, 50, 80, 80);
//    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
//
//// add all of the bodies to the world
//    World.add(engine.world, [boxA, boxB, ground]);
//
//// run the engine
//    Engine.run(engine);

}

export default space();