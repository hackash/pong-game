PongGame.modules = PongGame.modules || {};

(function (PIXI, config) {

    PongGame.modules.Wall = function (texture, stage) {
        this.stage = stage;
        this.rockTexture = texture;
        // todo move to separate module
        this.level = {
            rocks: 20
        };
    };

    PongGame.modules.Wall.prototype.getMaxRocksOnOneLine = function (rock) {
        return Math.round(config.display.width / rock.config.width);
    };

    PongGame.modules.Wall.prototype.init = function () {
        var x = 0, y = 0;
        for (var i = 0; i < this.level.rocks; i++) {
            var rock = new PongGame.modules.Rock();
            var sprite = rock.getSprite(this.rockTexture);
            if (x > 0) {
                var conf = {x: x * rock.config.width, y: y};
                var maxRocks = this.getMaxRocksOnOneLine(rock);
                if (x === maxRocks) {
                    var lineNumber = (i / maxRocks);
                    conf.y = rock.config.height * lineNumber;
                    conf.x = 0;
                    y = rock.config.height * lineNumber;
                    x = 0;

                }
                _.extend(sprite, conf);
            }
            this.stage.addChild(sprite);
            x++;
        }
        return this;
    };

}(PIXI, PongGame.Config));