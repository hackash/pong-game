var PongGame = PongGame || {};

PongGame.Config = (function () {
    return {
        display: {
            width: 800,
            height: 600,
            options: {
                autoResize: true
            }
        },
        resources: {
            ball: {
                path: 'images/ball.png'
            },
            rock: {
                path: 'images/rock.png'
            }
        }
    };
}());