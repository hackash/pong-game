PongGame.modules = PongGame.modules || {};

(function (PIXI, config) {

    PongGame.modules.Ball = function (texture, stage, gamePad) {
        this.stage = stage;
        this.gamePad = gamePad;
        this.speed = 5;
        this.DEFAULT_FRICTION_X = 2;
        this.DEFAULT_FRICTION_Y = 2;
        this.DEFAULT_ACCELERATION_Y = 2;
        this.DEFAULT_ACCELERATION_X = 2;
        this.config = {
            width: 50,
            height: 50,
            alpha: 0,
            x: 300,
            y: 2
        };
        this.instance = new PIXI.Sprite(texture);
        this.instance.vy = 1;
        this.instance.vx = 1;
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
        if (this.instance.vx < 0) {
            this.instance.vx = -1;
            this.instance.vx -= 0.1;
            this.instance.vx -= this.DEFAULT_ACCELERATION_X;
        }else{
            this.instance.vx = 1;
            this.instance.vx += 0.1;
            this.instance.vx += this.DEFAULT_ACCELERATION_X;
        }

        if (this.instance.vy < 0) {
            this.instance.vy = -1;
            this.instance.vy -= 0.1;
            this.instance.vy -= this.DEFAULT_ACCELERATION_Y;
        }else{
            this.instance.vy = 1;
            this.instance.vy += 0.1;
            this.instance.vy += this.DEFAULT_ACCELERATION_Y;
        }

        this.instance.vx *= this.DEFAULT_FRICTION_X;
        this.instance.vy *= this.DEFAULT_FRICTION_Y;

        this.innerState();
    };

    PongGame.modules.Ball.prototype.move = function () {
        this.checkCollision();
        this.instance.y += this.instance.vy;
        this.instance.x += this.instance.vx;
    };

    PongGame.modules.Ball.prototype.checkCollision = function () {
        if (this.collision.isFarFromLeftBound() || this.collision.isFarFromRightBound()) {
            this.instance.vx = -this.instance.vx;
        }
        if (this.collision.isFarFromBottomBound() || this.collision.isFarFromTopBound()) {
            this.instance.vy = -this.instance.vy;
        }
    };

    PongGame.modules.Ball.prototype.setState = function (state) {
        this.state = _.isFunction(state) ? state : _.noop;
    };

    PongGame.modules.Ball.prototype.flushState = function () {
        this.setState(_.noop);
    };

    PongGame.modules.Ball.prototype.innerState = PongGame.modules.Ball.prototype.move;

    PongGame.modules.Ball.prototype.init = function () {
        this.stage.addChild(this.instance);
        this.collision = new PongGame.modules.Collision(this.instance);
        this.collision.setBounds(0, 0, {x: config.display.width, y: config.display.height});

        this.collision.isFarFromBottomBound = function () {
            return ((this.instance.y + this.instance.height) >= (config.display.height - this.gamePad.height)) &&
                ((this.instance.x + (Math.round(this.instance.width / 2)) >= this.gamePad.x ) && (this.instance.x + (Math.round(this.instance.width / 2)) <= (this.gamePad.x + this.gamePad.width)));
        }.bind(this);

        this.setState(this.show);
        return this;
    };

}(PIXI, PongGame.Config));