class Scene extends Phaser.Scene {
        
    preload(){
        this.load.image('hills', '../assets/grassy-hills.jpg');
        this.load.image('chat', '../assets/chat.png');
    }

    create(){
        let background = this.add.image(800,450,'hills');
        background.setScale(2);

        let chat: Phaser.GameObjects.Image = this.add.image(100,100,'chat');
        chat.setScale(0.25);
        chat.setInteractive();
        let click = 0;

        let rect = this.add.rectangle(100, 100, 200, 200);
        rect.setStrokeStyle(10, 0xFFFFFF);
        rect.setVisible(false);

        chat.on(Phaser.Input.Events.POINTER_DOWN, function() {
            click++;
            rect.setVisible(true);
            if(click >= 2){
                console.log('hi');
                rect.setVisible(false);
            }
            doubleClickTimer();
        }, this);

        function doubleClickTimer(){
            setTimeout(function(){
                click = 0;
            },700);
        }
    }
}

window.addEventListener('load', (event) => {

    let config = {
        type: Phaser.AUTO,
        width: 1600,
        height: 900,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene: Scene
    };

    let game = new Phaser.Game(config);


    

});
