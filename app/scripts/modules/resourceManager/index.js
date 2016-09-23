PongGame.modules = PongGame.modules || {};

PongGame.modules.resourceManager = (function (PIXI, config) {
    var resources = _.map(_.values(config.resources), function (r) {
        return r.path;
    });

    function onProgress(loader) {
        console.log('loading resource ... ', loader.progress)
    }

    function loadResources(setup) {
        setup = _.isFunction(setup) ? setup : _.noop;
        PIXI.loader.add(resources).on('progress', onProgress).load(setup);
    }

    function addSprites(textures, stage) {
        _.each(textures, function (item) {
            __addSprite(PIXI.loader.resources[item.name].texture, stage);
        });
    }

    function __addSprite(texture, stage) {
        var sprite = new PIXI.Sprite(texture);
        stage.addChild(sprite);
    }

    return {
        loadResources: loadResources,
        addSprites: addSprites
    };

})(PIXI, PongGame.Config);