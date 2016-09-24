PongGame.modules = PongGame.modules || {};

(function (PIXI, config) {
    PongGame.modules.Collision = function (figure) {
        this.bounds = {
            frame: {
                x: 0,
                y: 0
            },
            x: 0,
            y: 0
        };
        this.figure = figure;
    };

    PongGame.modules.Collision.prototype.isFarFromRightBound = function () {
        return (this.figure.x + this.figure.width) < this.bounds.frame.x;
    };

    PongGame.modules.Collision.prototype.isFarFromLeftBound = function () {
        return this.figure.x > this.bounds.x;
    };

    PongGame.modules.Collision.prototype.isFarFromTopBound = function () {
        return this.figure.y > this.bounds.y;
    };

    PongGame.modules.Collision.prototype.isFarFromBottomBound = function () {
        return ((this.figure.y + this.figure.height) + 1) < this.bounds.frame.y;
    };

    PongGame.modules.Collision.prototype.setBounds = function (x, y, frame) {
        this.bounds.x = x;
        this.bounds.y = y;
        this.bounds.frame = frame;
    };

}(PIXI, PongGame.Config));
