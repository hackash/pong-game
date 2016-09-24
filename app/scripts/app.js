(function (window, PIXI, PongGame, undefined) {
    var config = PongGame.Config;
    var stage = new PIXI.Container();
    var resourceManager = PongGame.modules.resourceManager;
    var renderer = new PIXI.WebGLRenderer(config.display.width, config.display.height, config.display.options);
    var scaleToWindow = function (view) {
        view.style.position = "absolute";
        view.style.width = window.innerWidth + "px";
        view.style.height = window.innerHeight + "px";
        view.style.display = "block";
    };

    function loadResources() {
        resourceManager.loadResources(function () {
            var gamePad = new PongGame.modules.GamePad(stage).init();
            var ball = new PongGame.modules.Ball(PIXI.loader.resources[config.resources.ball.path].texture, stage, gamePad.instance).init();

            function animate() {
                gamePad.state();
                ball.state();
                requestAnimationFrame(animate);
                renderer.render(stage);
            }

            function start() {
                document.querySelector('#container').appendChild(renderer.view);
                //scaleToWindow(renderer.view);
                animate();
            }

            start();
        });
    }

    setTimeout(loadResources, 0);

})(window, PIXI, PongGame);