define('buran', ['konva', 'app'], function (konva, app) {

    var angle = 0;

    var api = {
        speed: 4,
        turnSpeed: 2,

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


    return api;

});
