
import Konva from 'konva';
import stage from '../stage';
import u from '../utils';

class Buran {

    constructor() {

        this._angle = 0;                // угол поворота корабля

        this.maxSpeed = 5;              // *60 px/s
        this.currentSpeed = 0;
        this.acceleration = 2;          // *60 px/s
        this.turnSpeed = 2;
        this.whizbangSpeed = 1;
        this.fireRate = 100;
        this.fireState = false;
        this.moveState = false;

        new Promise((resolve, reject) => {

            let buranImgObj = new Image();
            buranImgObj.onload = () => {
                this.buranImg = new Konva.Image({
                    image: buranImgObj,
                    width: 48,
                    height: 44,
                    x: 100,
                    y: 100,
                    offset: {
                        x: 20,
                        y: 22
                    },
                    rotate: this._angle
                });
                stage.layer.add(this.buranImg);
                stage.layer.draw();

                resolve()
            };
            buranImgObj.src = '../images/ships_96.png';

        }).then(() => {
            new Konva.Animation((frame) => {

              // Движение по курсу
                let sin = u.math.sin(this._angle);
                let cos = u.math.cos(this._angle);

                this.buranImg.setX(this.buranImg.x() + this.currentSpeed * cos);
                this.buranImg.setY(this.buranImg.y() + this.currentSpeed * sin);

              // Повороты
                if (this._turningLeft) {
                    this._angle -= this.turnSpeed;
                    this.buranImg.rotate(-this.turnSpeed);
                } else if (this._turningRight) {
                    this._angle += this.turnSpeed;
                    this.buranImg.rotate(+this.turnSpeed);
                }

            }, stage.layer).start();
        });

    }

    /** Руль прямо */
    wheelCenter() {
        this._turningLeft = false;
        this._turningRight = false;
    }

    /** Руль влево */
    wheelLeft() {
        this._turningLeft = true;
    }

    /** Руль вправо */
    wheelRight() {
        this._turningRight = true;
    }

    /** Газ */
    flyForward() {
        clearInterval(this._flyStopInterval);
        this._flyForwardInterval = setInterval(() => {
            this.currentSpeed += 0.5;
            if(this.currentSpeed >= this.maxSpeed) {
                clearInterval(this._flyForwardInterval)
            }
        }, 18);
    }

    /** Тормоз */
    flyStop() {
        clearInterval(this._flyForwardInterval);
        this._flyStopInterval = setInterval(() => {
            this.currentSpeed -= 0.1;
            if(this.currentSpeed <= 0) {
                this.currentSpeed = 0;
                clearInterval(this._flyStopInterval)
            }
        }, 18);
    };

    /** Огонь */
    fire(){

        let self = this;
        let gunActive = 1;

        setTimeout(function run() {

            let sin = u.math.sin(self._angle),
                cos = u.math.cos(self._angle),
                gunPosX = self.buranImg.x() + u.math.cos(self._angle + 70 * gunActive) * 16,
                gunPosY = self.buranImg.y() + u.math.sin(self._angle + 70 * gunActive) * 16;

            let whizbang = new Konva.Circle({
                x: self.buranImg.x(),
                y: self.buranImg.y(),
                radius: 2,
                fill: '#ffffff'
            });
            stage.layer.add(whizbang);
            stage.layer.draw();

            let fire = new Konva.Animation(function(frame) {
                whizbang.setX(gunPosX + self.whizbangSpeed * frame.time * cos);
                whizbang.setY(gunPosY + self.whizbangSpeed * frame.time * sin);
            }, stage.layer);

            /* Поочередная смена пушек */
            if(gunActive == 1) {gunActive = -1}
            else {gunActive = 1}

            fire.start();

            setTimeout(function() {
                whizbang.destroy();
            }, 3000);

            setTimeout(function(){
                if(self.fireState) run();
            }, self.fireRate);

        }, 0);
    };

}

export default Buran;
