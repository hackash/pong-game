PongGame.modules = PongGame.modules || {};

(function (PIXI, globalConfig) {
    PongGame.modules.GamePad = function (stage) {
        this.stage = stage;
        this.instance = null;
        this.speed = 5;
        this.config = {
            color: 0x6666FF,
            borderColor: 0x000000,
            radius: 5,
            opacity: .5
        }
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
    };


    PongGame.modules.GamePad.prototype.hide = function () {
        if (this.instance.alpha !== 0) {
            this.instance.alpha -= .01;
            return false;
        }
        this.flushState();
    };


    PongGame.modules.GamePad.prototype.moveRight = function () {
        if (!this.instance.vx) {
            this.instance.vx = 1;
        }
        this.instance.x += this.speed;
    };

    PongGame.modules.GamePad.prototype.moveLeft = function () {
        if (!this.instance.vx) {
            this.instance.vx = 1;
        }
        this.instance.x -= this.speed;
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
        this.config.width = Math.round(globalConfig.display.width / 4);
        this.config.height = Math.round(40);
        this.config.x = Math.round((globalConfig.display.width / 2) - ( this.config.width / 2));
        this.config.y = Math.round((globalConfig.display.height) - ( this.config.height));

        var rect = new PIXI.Graphics();
        rect.alpha = 0;
        rect.beginFill(this.config.color, 1);
        rect.lineStyle(4, this.config.borderColor, 1);
        this.instance = rect.drawRoundedRect(this.config.x, this.config.y, this.config.width, this.config.height, this.config.radius);
        this.stage.addChild(rect);
        this.setState(this.show);
        return this;
    };
}(PIXI, PongGame.Config));
