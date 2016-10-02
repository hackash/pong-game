PongGame.modules = PongGame.modules || {};

(function (PIXI) {

    PongGame.modules.Rock = function () {
        this.config = {
            width: 80,
            height: 30,
            x: 0,
            y: 0
        };
    };

    PongGame.modules.Rock.prototype.getSprite = function (texture) {
        var sprite = new PIXI.Sprite(texture);
        _.extend(sprite, this.config);
        return sprite;
    };

}(PIXI));