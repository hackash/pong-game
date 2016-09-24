PongGame.modules = PongGame.modules || {};

(function (PIXI, config) {

    PongGame.modules.Ball = function (texture, stage, gamePad) {
        this.stage = stage;
        this.gamePad = gamePad;
        this.speed = 5;
        this.config = {
            width: 50,
            height: 50,
            alpha: 0,
            x: 0,
            y: 0
        };
        this.instance = new PIXI.Sprite(texture);
        _.extend(this.instance, this.config);
    };

    PongGame.modules.Ball.prototype.show = function () {
        if (this.instance.alpha < 1) {
            this.instance.alpha += .01;
            return false;
        }
        this.setState(this.fallDown);
    };


    PongGame.modules.Ball.prototype.hide = function () {
        if (this.instance.alpha > 0) {
            this.instance.alpha -= .01;
            return false;
        }
        this.flushState();
    };

    PongGame.modules.Ball.prototype.fallDown = function () {
        this.instance.frictionY = 2;
        this.instance.accelerationY = 2;
        this.instance.frictionX = 2;
        this.instance.accelerationX = 2;
        this.instance.vy = 0;
        this.instance.vx = 0;

        //Acceleration and friction
        this.instance.vy += this.instance.accelerationY;
        this.instance.vy *= this.instance.frictionY;

        this.instance.vx += this.instance.accelerationX;
        this.instance.vx *= this.instance.frictionY;

        //Gravity
        this.instance.vy += 0.1;
        this.instance.vx += 0.1;
        this.innerState();
    };

    PongGame.modules.Ball.prototype.directionToDownRight = function () {
        if (this.collision.isFarFromBottomBound()) {
            this.instance.y += this.instance.vy * 2;
            if (this.collision.isFarFromRightBound()) {
                this.instance.x += this.instance.vx;
            } else {
                this.innerState = this.directionToDownLeft;
            }
        } else {
            this.innerState = this.directionToTopLeft;
        }
    };

    PongGame.modules.Ball.prototype.directionToDownLeft = function () {
        if (this.collision.isFarFromBottomBound()) {
            this.instance.y += this.instance.vy * 2;
            if (this.collision.isFarFromLeftBound()) {
                this.instance.x += this.instance.vx;
            } else {
                this.innerState = this.directionToDownRight;
            }
        } else {
            this.innerState = this.directionToTopLeft;
        }
    };

    PongGame.modules.Ball.prototype.directionToTopLeft = function () {
        if (this.collision.isFarFromTopBound()) {
            this.instance.y -= this.instance.vy;
            if (this.collision.isFarFromLeftBound()) {
                this.instance.x -= this.instance.vx;
            } else {
                this.innerState = this.directionToTopRight;
            }
        } else {
            this.innerState = this.directionToDownRight;
        }
    };

    PongGame.modules.Ball.prototype.directionToTopRight = function () {
        if (this.collision.isFarFromTopBound()) {
            this.instance.y -= this.instance.vy;
            if (this.collision.isFarFromRightBound()) {
                this.instance.x += this.instance.vx * 2;
            } else {
                this.innerState = this.directionToTopLeft;
            }
        } else {
            this.innerState = this.directionToDownRight;
        }
    };


    PongGame.modules.Ball.prototype.setState = function (state) {
        this.state = _.isFunction(state) ? state : _.noop;
    };

    PongGame.modules.Ball.prototype.flushState = function () {
        this.setState(_.noop);
    };

    PongGame.modules.Ball.prototype.innerState = PongGame.modules.Ball.prototype.directionToDownLeft;

    PongGame.modules.Ball.prototype.init = function () {
        this.stage.addChild(this.instance);
        this.collision = new PongGame.modules.Collision(this.instance);
        this.collision.setBounds(0, 0, {x: config.display.width, y: config.display.height});
        this.collision.isFarFromBottomBound = function () {
            if ((this.instance.y + this.instance.height) < (config.display.height - this.gamePad.height)) {
                return true;
            }
            return !((this.instance.x >= this.gamePad.x ) && (this.instance.x <= (this.gamePad.x + this.gamePad.width)));
        }.bind(this);
        this.setState(this.show);
        return this;
    };

}(PIXI, PongGame.Config));