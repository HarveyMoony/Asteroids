define('buran', ['konva', 'app'], function (konva, app) {

    var angle = 0,
        fireInterval;

    var api = {
        speed: 4,
        turnSpeed: 2,
        whizbangSpeed: 1,
        gunActive: 1,

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
        var sin = Math.sin(angle * Math.PI / 180);
        var cos = Math.cos(angle * Math.PI / 180);

        api.img.setX(api.img.x() + api.speed * cos);
        api.img.setY(api.img.y() + api.speed * sin);
    }, app.layer);

    /** Выстрел */
    api.fire = function (){
        fireInterval = setInterval(function() {

            var x = api.img.x(),
                y = api.img.y(),
                sin = Math.sin(angle * Math.PI / 180),
                cos = Math.cos(angle * Math.PI / 180);

            var whizbang = new Konva.Circle({
                x: api.img.x(),
                y: api.img.y(),
                radius: 2,
                fill: '#bb0000'
            });
            app.layer.add(whizbang);
            app.layer.draw();

            var fire = new Konva.Animation(function(frame) {
                whizbang.setX(x + api.whizbangSpeed * frame.time * cos);
                whizbang.setY(y + api.whizbangSpeed * frame.time * sin);
            }, app.layer);

            fire.start();

            setTimeout(function() {
                whizbang.destroy();
            }, 3000)

        }, 100);
    };


    return api;

});
