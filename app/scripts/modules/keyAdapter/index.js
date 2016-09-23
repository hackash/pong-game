PongGame.modules = PongGame.modules || {};

(function (PIXI, globalConfig, window) {

    PongGame.modules.KeyAdapter = function (keyCode) {
        this.keyCode = keyCode;
        this.pressed = _.noop;
        this.released = _.noop;
        this.state = {
            pressed: false,
            released: false
        };
    };

    PongGame.modules.KeyAdapter.prototype.onKeyDown = function (evt) {
        if (this.isDefinedKey(evt.keyCode)) {
            this.state.released = false;
            this.state.pressed = true;
            this.pressed.call(this, arguments);
        }
    };

    PongGame.modules.KeyAdapter.prototype.onKeyUp = function (evt) {
        if (this.isDefinedKey(evt.keyCode)) {
            this.state.pressed = false;
            this.state.released = true;
            this.released.call(this, arguments);
        }
    };

    PongGame.modules.KeyAdapter.prototype.isDefinedKey = function (code) {
        return this.keyCode === code;
    };

    PongGame.modules.KeyAdapter.prototype.init = function () {
        window.addEventListener('keydown', this.onKeyDown.bind(this), false);
        window.addEventListener('keyup', this.onKeyUp.bind(this), false);
        return this;
    };
}(PIXI, PongGame.Config, window));