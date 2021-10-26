// create a new scene 
let gameScene = new Phaser.Scene('Game');
//let setVelocity = 100;
let playerX = 70;
let playerY = 200;
let enemyX = 500;
let enemyY = 150;
let enemy;
var platform;
let player;
var cursor;
const maxVelocityX = 200;   // maximum player velocity in x direction
const enemySpeed = 100;     // speed of enemy movement
const enemyLeft = 450;      // left bound for enemy
const enemyRight = 600;     // right bound for enemy

// let acceleration = 400;     // player acceleration
// const friction = .9;        // friction slows player down on ground
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
        // platform = this.add.group();
        // the ground
        platform = this.physics.add.staticGroup();
        platform.create(300, 350, 'platform').setScale(2).refreshBody();

        platform.create(50, 120, 'platform');
        platform.create(600, 200, 'platform');
        platform.create(100, 250, 'platform');
        // platform.setPosition(300, 300);
        // ground.setScale(50,1);
        // game.body.immovable = true;
        cursor = this.input.keyboard.createCursorKeys();

    //creating player
        player = this.physics.add.sprite(playerX, playerY, 'player');
        player.body.collideWorldBounds = true;
        this.physics.add.collider(player, platform);
        this.physics.add.collider(player, enemy);
        player.setBounce(0.1);
        // this.physics.arcade.enable(player);
        // player.setScale(0.5,0.5)

    //creating enemy
        enemy = this.physics.add.sprite(enemyX, enemyY, 'player', 1);
        enemy.body.collideWorldBounds = true;
        this.physics.add.collider(enemy, platform);
        this.physics.add.collider(player, enemy, hitEnemy, null, this);
        enemy.setBounce(0.1);
        enemy.setVelocityX(enemySpeed);
}

// player movement
gameScene.update = function(){
    // // player movement for sprite on ground/platform
    // if(player.body.touching.down){
    //     if(cursor.right.isDown){
    //         if(player.body.velocity.x < maxVelocityX){
    //             player.body.setAccelerationX(acceleration);
    //         }
    //     }else if(cursor.left.isDown){
    //         if(-player.body.velocity.x < maxVelocityX){
    //             player.body.setAccelerationX(-acceleration);
    //         }
    //     // slow the player down due to friction when on ground if no input given from user
    //     }else if(!cursor.right.isDown && !cursor.left.isDown){
    //         // player moving right
    //         if(player.body.velocity.x > 0){            
    //             player.body.setVelocityX(Math.floor(player.body.velocity.x * friction));
    //         // player moving left
    //         }else{
    //             player.body.setVelocityX(Math.ceil(player.body.velocity.x * friction));
    //         }
    //         player.body.setAccelerationX(0);
    //     }
    //     // jump when up key is hit and do not allow left/right input while in air
    //     if(cursor.up.isDown){
    //         player.setVelocityY(-250);
    //         player.body.setAccelerationX(0);
    //     }
    // }

    if(cursor.right.isDown){
        // move player right at maxVelocityX
        player.body.setVelocityX(maxVelocityX);
    }else if(cursor.left.isDown){    
        // move player left at maxVelocityX
        player.body.setVelocityX(-maxVelocityX);
    }else{
        // stop player movement in x direction
        player.body.setVelocityX(0);
    }
    // jump if on ground when up arrow is pressed
    if(cursor.up.isDown && player.body.touching.down){
        player.setVelocityY(-250);
    }


    // enemy movement
    // moves enemy back and forth
    // need to fix where if player and enemy collide, enemy stops and does not resume movement sometimes
    if(enemy.x > enemyRight && enemy.body.velocity.x > 0){
        enemy.setVelocityX(-enemySpeed);
    }else if(enemy.x < enemyLeft && enemy.body.velocity.x < 0){
        enemy.setVelocityX(enemySpeed);
    }else if(enemy.body.velocity.x == 0){
        enemy.setVelocityX(enemySpeed);
    }
}

// collision between player and enemy
function hitEnemy(player, enemy){
    this.physics.pause();
    player.setTint(0xff0000);
    gameOver = true;
}

let config = {
type: Phaser.AUTO, // Phaser will use webGL if available, if not it will use canvas 
width: 640,
height: 360,
physics: {
    default: 'arcade', 
    arcade: {
        gravity: { y : 300 },
        debug: false
    }
},
scene: gameScene
};
// create a new game, pass the configurations 

let game = new Phaser.Game(config);

// When a new scene is started the following functions are called 
// init() -> this is called once, which is used to initialize certain assets in your scene 
// preload() -> This is where the asset preload is initiated -> all the assets are loaded to memory which then can be used as soon as possible 
// create() -> also called once after the preload function is finished, and the image/sprite is drawn to the canvas
// update()
