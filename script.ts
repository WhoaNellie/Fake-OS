let click = 0;

class Icon extends Phaser.GameObjects.Image{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.setInteractive();
        this.setScale(0.25);

        let highlight = this.scene.add.rectangle(x, y, 200, 200);
        highlight.setStrokeStyle(10, 0xFFFFFF);
        highlight.setVisible(false);

        this.on(Phaser.Input.Events.POINTER_DOWN, function() {
            click++;
            highlight.setVisible(true);
            if(click >= 2){
                console.log(this);
                highlight.setVisible(false);
            }
            this.doubleClickTimer();
        }, this);
    }
    
    doubleClickTimer(){
        setTimeout(function(){
            click = 0;
        },700);
    }
}

class Scene extends Phaser.Scene {
        
    preload(){
        this.load.image('hills', '../assets/grassy-hills.jpg');
        this.load.image('chat', '../assets/chat.png');
        this.load.image('folder', '../assets/folder.png');
    }

    create(){
        let background = this.add.image(800,450,'hills');
        background.setScale(2);

        let chat: Icon = new Icon(this, 100, 100,'chat');
        let folder:Icon = new Icon(this, 100, 300, 'folder');
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
