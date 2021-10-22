// create a new scene 
    let gameScene = new Phaser.Scene('Game');
// set the scene configurations

// load assets 
    gameScene.preload = function(){
        this.load.image('background', 'Assets/background.png');
        this.load.spritesheet('player', 'Assets/walkingSpritesheet.png',{frameWidth: 32, frameHeight: 32 });
        this.load.image('platform', 'Assets/platform.png');
    };

// create the assets
    gameScene.create = function(){

        let gameWidth = this.sys.game.config.width;
        let gameHeight = this.sys.game.config.height;
        //create background
            let bg = this.add.sprite(0,0, 'background');
            // bg.setOrigin(0,0);
            bg.setPosition(gameWidth/2, gameHeight/2);
            bg.setScale(0.8,0.7);
        // creating platform 
            platform = this.add.group();
            // the ground
            let ground = platform.create(50, 360, 'ground');
            ground.setScale(50,1);
            // game.body.immovable = true;

            

        //creating player
            let player = this.add.sprite(70,320, 'player');
            // this.physics.arcade.enable(player);
            // player.setScale(0.5,0.5)
            

    }

let config = {
    type: Phaser.AUTO, // Phaser will use webGL if available, if not it will use canvas 
    width: 640,
    height: 360,
    scene: gameScene
};
// create a new game, pass the configurations 

let game = new Phaser.Game(config);

// When a new scene is started the following functions are called 
// init() -> this is called once, which is used to initialize certain assets in your scene 
// preload() -> This is where the asset preload is initiated -> all the assets are loaded to memory which then can be used as soon as possible 
// create() -> also called once after the preload function is finished, and the image/sprite is drawn to the canvas
// update() 

