
import Konva from 'konva';
import stage from '../stage';
import u from '../utils';

class Buran {

    constructor(name = 'Shadow') {

        this.maxSpeed = 5;              // *60 px/s
        this.currentSpeed = 0;
        this.acceleration = 2;          // *60 px/s
        this.turnSpeed = 2;
        this.whizbangSpeed = 1;
        this.fireRate = 100;
        this.fireState = false;

        this.posX = 100;
        this.posY = 100;
        this.angle = 90;                 // угол поворота корабля

        new Promise((resolve, reject) => {

            let buranImgObj = new Image();
            buranImgObj.onload = () => {
                this.buranImg = new Konva.Image({
                    image: buranImgObj,
                    width: 48,
                    height: 44,
                    x: this.posX,
                    y: this.posY,
                    offset: {
                        x: 20,
                        y: 22
                    },
                    rotation: this.angle
                });
                stage.layer.add(this.buranImg);
                stage.layer.draw();

                resolve()
            };
            buranImgObj.src = '../images/ships_96.png';

            this._nameText = new Konva.Text({
                x: 130,
                y: 80,
                text: name,
                fontSize: 14,
                fontFamily: 'Calibri',
                fill: 'white'
            });

            stage.layer.add(this._nameText)

        }).then(() => {
            new Konva.Animation((frame) => {

              // Движение по курсу
                let sin = u.math.sin(this.angle);
                let cos = u.math.cos(this.angle);

                this.posX = this.buranImg.x();
                this.posY = this.buranImg.y();

                this.buranImg.setX(this.posX + this.currentSpeed * cos);
                this.buranImg.setY(this.posY + this.currentSpeed * sin);

              // Текст
                this._nameText.setX(this.buranImg.x());
                this._nameText.setY(this.buranImg.y() + 30);

                this._nameText.setText(this.angle);

              // Повороты
                if (this._turningLeft) {
                    this.angle -= this.turnSpeed;
                    this.buranImg.rotate(-this.turnSpeed);
                } else if (this._turningRight) {
                    this.angle += this.turnSpeed;
                    this.buranImg.rotate(+this.turnSpeed);
                }

            }, stage.layer).start();
        });

    }


  // API

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

            let sin = u.math.sin(self.angle),
                cos = u.math.cos(self.angle),
                gunPosX = self.buranImg.x() + u.math.cos(self.angle + 70 * gunActive) * 16,
                gunPosY = self.buranImg.y() + u.math.sin(self.angle + 70 * gunActive) * 16;

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
    }


  // Helpers

    destroy() {
        this.buranImg.destroy();
        this._nameText.destroy();
    }

    setPosition(x, y, angle) {
        this.buranImg.setX(x);
        this.buranImg.setY(y);
        this.buranImg.rotate(angle - this.angle);
        this.angle = angle;
    }

}

export default Buran;
