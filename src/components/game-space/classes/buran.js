module.exports = function() {

    var konva = require('konva'),
        u = require('utils'),
        canvas = require('canvas');


    var angle = 0,              // угол поворота корабля
        flyAngle = 0,           // угол направления движения корабля
        flyForwardInterval,
        flyStopInterval;


    var api = {
        maxSpeed: 5, // *60 px/s
        currentSpeed: 0,
        acceleration: 2, // *60 px/s
        turnSpeed: 2,
        whizbangSpeed: 1,
        fireRate: 100,
        fireState: false,
        moveState: false,

        init: init,
        buranImg: {},
        turnLeft: {},
        turnRight: {}
    };

    function init() {
        return new Promise(function(resolve, reject) {

            var buranImgObj = new Image();
            buranImgObj.onload = function() {
                api.buranImg = new Konva.Image({
                    image: buranImgObj,
                    width: 48,
                    height: 44,
                    x: 100,
                    y: 100,
                    offset: {
                        x: 20,
                        y: 22
                    },
                    rotate: angle
                });
                canvas.layer.add(api.buranImg);
                canvas.layer.draw();

                resolve()
            };
            buranImgObj.src = 'img/buran-48.png';

        });
    }

    /** Поворот влево */
    api.turnLeft = new Konva.Animation(function(frame) {
        angle -= api.turnSpeed;
        if (api.moveState) flyAngle = angle;

        api.buranImg.rotate(-api.turnSpeed);
    }, canvas.layer);

    /** Поворот вправо */
    api.turnRight = new Konva.Animation(function(frame) {
        angle += api.turnSpeed;
        if (api.moveState) flyAngle = angle;

        api.buranImg.rotate(api.turnSpeed);
    }, canvas.layer);

    /** Газ */
    api.flyForward = function() {
        clearInterval(flyStopInterval);
        api.moveState = true;
        flyForwardInterval = setInterval(function() {
            api.currentSpeed += 0.5;
            if(api.currentSpeed >= api.maxSpeed) {
                clearInterval(flyForwardInterval)
            }
        }, 18);
    };
    api.flyStop = function() {
        clearInterval(flyForwardInterval);
        api.moveState = false;
        flyStopInterval = setInterval(function() {
            api.currentSpeed -= 0.1;
            if(api.currentSpeed <= 0) {
                clearInterval(flyStopInterval)
            }
        }, 18);
    };

    api.flyForwardAnimationInit = new Konva.Animation(function(frame) {
        var sin = u.math.sin(flyAngle);
        var cos = u.math.cos(flyAngle);

        api.buranImg.setX(api.buranImg.x() + api.currentSpeed * cos);
        api.buranImg.setY(api.buranImg.y() + api.currentSpeed * sin);
    }, canvas.layer);

    /** Огонь */
    api.fire = function (){

        var gunActive = 1;

        setTimeout(function run() {

            var sin = u.math.sin(angle),
                cos = u.math.cos(angle),
                gunPosX = api.buranImg.x() + u.math.cos(angle + 70 * gunActive) * 16,
                gunPosY = api.buranImg.y() + u.math.sin(angle + 70 * gunActive) * 16;

            var whizbang = new Konva.Circle({
                x: api.buranImg.x(),
                y: api.buranImg.y(),
                radius: 2,
                fill: '#ffffff'
            });
            canvas.layer.add(whizbang);
            canvas.layer.draw();

            var fire = new Konva.Animation(function(frame) {
                whizbang.setX(gunPosX + api.whizbangSpeed * frame.time * cos);
                whizbang.setY(gunPosY + api.whizbangSpeed * frame.time * sin);
            }, canvas.layer);

            /* Поочередная смена пушек */
            if(gunActive == 1) {gunActive = -1}
            else {gunActive = 1}

            fire.start();

            setTimeout(function() {
                whizbang.destroy();
            }, 3000);

            setTimeout(function(){
                if(api.fireState) run();
            }, api.fireRate);

        }, 0);
    };


    return api;

};
