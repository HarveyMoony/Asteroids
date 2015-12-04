define('app', ['jquery'], function(jquery){

    var $speed= $('.speed'),
        $angle = $('.angle');

    var api = {
        $buran: $('.buran'),
        posX: 100,
        posY: 100,
        speed: 0,
        angle: 0,

        init: init,
        render: render,
        run: run
    };

    return api;


/* API */

    function init() {
        api.render();
        api.run();

        document.addEventListener('keydown', function(e) {
            switch (e.keyCode) {
                case 38: api.speed -= .5; break;
                case 40: api.speed += .5; break;

                case 37: angleDec(); break;
                case 39: angleInc(); break;
            }
        });

        function angleInc() {
            api.angle -= 5;
            if(api.angle <= -1) {
                api.angle = 359
            }
        }

        function angleDec() {
            api.angle += 5;
            if (api.angle >= 360){
                api.angle = 0
            }
        }
    }

    function run() {
        var run = setInterval(function() {
            api.posX += Math.sin(api.angle * Math.PI/180) * api.speed;
            api.posY += Math.cos(api.angle * Math.PI/180) * api.speed;
            api.render();
        }, 25)
    }

    function render() {
        api.$buran.css({'top': api.posY, 'left': api.posX});
        $speed.text(api.speed);
        $angle.text(api.angle);
    }

});