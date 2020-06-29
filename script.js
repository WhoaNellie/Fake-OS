window.addEventListener('load', function (event) {
    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        }
    };
    var game = new Phaser.Game(config);
});
//# sourceMappingURL=script.js.map