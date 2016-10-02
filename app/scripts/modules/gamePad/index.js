PongGame.modules = PongGame.modules || {};

(function (PIXI, config) {
    PongGame.modules.GamePad = function (stage) {
        this.stage = stage;
        this.instance = null;
        this.speed = 10;
        this.config = {
            x: 0,
            color: 0x6666FF,
            borderColor: 0x000000,
            radius: 5,
            opacity: .5
        };
    };

    PongGame.modules.GamePad.prototype.state = _.noop;

    PongGame.modules.GamePad.prototype.setState = function (state) {
        this.state = _.isFunction(state) ? state : _.noop;
    };

    PongGame.modules.GamePad.prototype.flushState = function () {
        this.setState(_.noop);
    };

    PongGame.modules.GamePad.prototype.show = function () {
        if (this.instance.alpha < 1) {
            this.instance.alpha += .01;
            return false;
        }
        this.flushState();
        this.bindAction();
    };


    PongGame.modules.GamePad.prototype.hide = function () {
        if (this.instance.alpha > 0) {
            this.instance.alpha -= .01;
            return false;
        }
        this.flushState();
    };


    PongGame.modules.GamePad.prototype.moveRight = function () {
        if (!this.collision.isOnRightBound()) {
            if (!this.instance.vx) {
                this.instance.vx = 1;
            }
            this.instance.x += this.speed;
        }
    };

    PongGame.modules.GamePad.prototype.moveLeft = function () {
        if (!this.collision.isOnLeftBound()) {
            if (!this.instance.vx) {
                this.instance.vx = 1;
            }
            this.instance.x -= this.speed;
        }
    };


    PongGame.modules.GamePad.prototype.bindAction = function () {
        var leftKeyAdapter = new PongGame.modules.KeyAdapter(37).init();
        var rightKeyAdapter = new PongGame.modules.KeyAdapter(39).init();
        var that = this;

        leftKeyAdapter.pressed = function () {
            that.setState(that.moveLeft.bind(that));
        };

        leftKeyAdapter.released = function () {
            that.flushState();
        };

        rightKeyAdapter.pressed = function () {
            that.setState(that.moveRight.bind(that));
        };

        rightKeyAdapter.released = function () {
            that.flushState();
        };

        return this;
    };

    PongGame.modules.GamePad.prototype.init = function () {
        this.config.width = Math.round(config.display.width / 4);
        this.config.height = Math.round(40);
        this.config.y = Math.round((config.display.height) - ( this.config.height));

        var rect = new PIXI.Graphics();
        rect.alpha = 0;
        rect.beginFill(this.config.color, 1);
        rect.lineStyle(4, this.config.borderColor, 1);
        this.instance = rect.drawRoundedRect(this.config.x, this.config.y, this.config.width, this.config.height, this.config.radius);
        this.collision = new PongGame.modules.Collision(rect);
        this.collision.setBounds(0, 0, {x: config.display.width});
        this.stage.addChild(rect);
        this.setState(this.show);
        return this;
    };
}(PIXI, PongGame.Config));
