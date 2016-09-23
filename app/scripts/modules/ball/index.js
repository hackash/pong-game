PongGame.modules = PongGame.modules || {};

(function (PIXI, Config) {

    PongGame.modules.Ball = function (texture, stage) {
        this.stage = stage;
        this.config = {
            width: 150,
            height: 150,
            alpha: 0,
            x: 0,
            y: 100
        };
        this.instance = new PIXI.Sprite(texture);
        _.extend(this.instance, this.config);
    };

    PongGame.modules.Ball.prototype.show = function () {
        if (this.instance.alpha < 1) {
            this.instance.alpha += .01;
            return false;
        }
        this.flushState();
    };


    PongGame.modules.Ball.prototype.hide = function () {
        if (this.instance.alpha !== 0) {
            this.instance.alpha -= .01;
            return false;
        }
        this.flushState();
    };

    PongGame.modules.Ball.prototype.setState = function (state) {
        this.state = _.isFunction(state) ? state : _.noop;
    };

    PongGame.modules.Ball.prototype.flushState = function () {
        this.setState(_.noop);
    };
    
    PongGame.modules.Ball.prototype.init = function () {
        this.stage.addChild(this.instance);
        this.setState(this.show);
        return this;
    };

}(PIXI, PongGame.Config));