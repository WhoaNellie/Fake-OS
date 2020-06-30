let click = 0;
let topWnd = 0;

class Icon extends Phaser.GameObjects.Image{
    constructor(scene:Scene, x:number, y:number, texture:string, highlight:Phaser.GameObjects.Rectangle, wnd){
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.setInteractive();
        this.setScale(0.25);

        highlight.setStrokeStyle(10, 0xFFFFFF);
        highlight.setVisible(false);

        this.on(Phaser.Input.Events.POINTER_DOWN, function() {
            click++;
            highlight.setPosition(x,y);
            highlight.setVisible(true);
            if(click >= 2){
                console.log(texture);
                wnd.setVisible(true);
                topWnd++;
                wnd.setDepth(topWnd);
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

class Wnd extends Phaser.GameObjects.Container{
    constructor(scene:Scene, x:number, y:number){
        super(scene, x, y);
        scene.add.existing(this);
        let windBG = scene.add.image(0,0,'windBG');
        windBG.setInteractive();
        this.add(windBG);
        this.setScale(1.5);
        // this.setVisible(false);
        this.setSize(windBG.width, windBG.height);
        // this.setInteractive();
        // scene.input.setHitArea(this.getAll()).on('pointerdown', function(i){
        //     // console.log(i);
        //     i.event.stopPropagation();
        //     topWnd++;
        //     this.setVisible(false);
        //     console.log(this);
        // },this);

        

        let bar = scene.add.image(0,-200, 'bar');
        bar.setInteractive();
        this.add(bar);
        bar.on(Phaser.Input.Events.POINTER_DOWN, function(e){
            this.setPosition(this.x + 10, this.y + 10);
            console.log(e);
        },this);

        

        let clickArea = new Phaser.GameObjects.Rectangle(scene,0,0, windBG.width, windBG.height);
        clickArea.setInteractive();
        this.add(clickArea);
        clickArea.on(Phaser.Input.Events.POINTER_DOWN, function(){
            this.parentContainer.bringToTop(this);
            topWnd++;
            // console.log(this.parentContainer.getAll());
            for(let i = 0; i < this.parentContainer.getAll().length; i++){
                // console.log(this.parentContainer.getAt(i));
                if(i === this.parentContainer.getAll().length - 1){
                    let len = this.parentContainer.getAt(i).getAll().length;
                    this.parentContainer.getAt(i).getAt(len - 2).setVisible(false);
                }else{
                    let len = this.parentContainer.getAt(i).getAll().length;
                    this.parentContainer.getAt(i).getAt(len - 2).setVisible(true); 
                }
            }
        },this); 
        
        let close = scene.add.image(300,-200, 'close');
        close.setScale(0.1);
        this.add(close);
        close.setInteractive();
        close.on(Phaser.Input.Events.POINTER_DOWN, function(){
            this.setVisible(false);
        }, this)
        
    }
    zInd = 0;
}

class Scene extends Phaser.Scene {
    preload(){
        this.load.image('hills', '../assets/grassy-hills.jpg');
        this.load.image('chat', '../assets/chat.png');
        this.load.image('folder', '../assets/folder.png');
        this.load.image('windBG', '../assets/window.png');
        this.load.image('close', '../assets/x.png');
        this.load.image('bar', '../assets/bar.png');
    }

    create(){
        let background = this.add.image(800,450,'hills');
        background.setScale(2);
        background.setInteractive();
        background.on(Phaser.Input.Events.POINTER_DOWN, function(){
            console.log('blick')
            highlight.setVisible(false);
        }, this);

        let highlight:Phaser.GameObjects.Rectangle = this.add.rectangle(0, 0, 200, 200);

        let windows = this.add.container(0,0);

        let chatWnd = new Wnd(this,800,500);
        let folderWnd = new Wnd(this,850,450);
        
        windows.add([chatWnd, folderWnd]);
        let chat:Icon = new Icon(this, 100, 100,'chat', highlight, chatWnd);
        let folder:Icon = new Icon(this, 100, 300, 'folder', highlight, folderWnd);

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
