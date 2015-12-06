define('buran', ['konva', 'utils', 'app'], function (konva, u, app) {

    var angle = 0;

    var api = {
        speed: 4,
        turnSpeed: 2,
        whizbangSpeed: 1,
        fireRate: 100,
        fireState: false,

        init: init,
        img: {},
        turnLeft: {},
        turnRight: {}
    };

    function init() {
        Konva.Image.fromURL('img/buran-32.png', function(image){
            api.img = image;
            image.width(32);
            image.height(32);
            image.x(100);
            image.y(100);
            image.offset({
                x: 16,
                y: 16
            });
            image.rotate(angle);
            app.layer.add(image);
            app.layer.draw();
        });

        console.log('buran');
        app.layer.draw();
    }

    /** Поворот влево */
    api.turnLeft = new Konva.Animation(function(frame) {
        angle -= api.turnSpeed;
        if(angle < 0) angle = 359;

        api.img.rotate(-api.turnSpeed);
    }, app.layer);

    /** Поворот вправо */
    api.turnRight = new Konva.Animation(function(frame) {
        angle += api.turnSpeed;
        if(angle > 359) angle = 0;

        api.img.rotate(api.turnSpeed);
    }, app.layer);

    /** Газ */
    api.flyForward = new Konva.Animation(function(frame) {
        var sin = u.math.sin(angle);
        var cos = u.math.cos(angle);

        api.img.setX(api.img.x() + api.speed * cos);
        api.img.setY(api.img.y() + api.speed * sin);
    }, app.layer);

    /** Огонь */
    api.fire = function (){

        var gunActive = 1;

        setTimeout(function run() {

            var sin = u.math.sin(angle),
                cos = u.math.cos(angle),
                gunPosX = api.img.x() + u.math.cos(angle + 90 * gunActive) * 11,
                gunPosY = api.img.y() + u.math.sin(angle + 90 * gunActive) * 11;

            var whizbang = new Konva.Circle({
                x: api.img.x(),
                y: api.img.y(),
                radius: 2,
                fill: '#bb0000'
            });
            app.layer.add(whizbang);
            app.layer.draw();

            var fire = new Konva.Animation(function(frame) {
                whizbang.setX(gunPosX + api.whizbangSpeed * frame.time * cos);
                whizbang.setY(gunPosY + api.whizbangSpeed * frame.time * sin);
            }, app.layer);

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

});
