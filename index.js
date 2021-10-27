    let playerX = 70;
    let playerY = 200;
    let enemyX = 500;
    let enemyY = 150;
    let enemy;
    var platform;
    let player;
    let cursor;
    let health;
    let backGroundBar;
    let healthBar;
    let healthLabel;

    const maxVelocityX = 200;   // maximum player velocity in x direction
    const enemySpeed = 100;     // speed of enemy movement
    const enemyLeft = 450;      // left bound for enemy
    const enemyRight = 600;
    let diamond;
    let temp = 20;
    let playerHealth = 100;
    let playerMaxHealth = 100;
    let gameBarX = 100;
    var score = 0;
    var scoreText;

    class gameScene extends Phaser.Scene {
    constructor(playerX, playerY, enemyX, enemyY, enemy, platform, cursor, maxVelocityX, enemySpeed, enemyLeft, enemyRight) {
        super({ key: 'gameScene' });
        this.playerX = playerX;
        this.playerY = playerY;
        this.enemyX = enemyX;
        this.enemyY = enemyY;
        this.enemy = enemy;
        this.platform = platform;
        this.cursor = cursor;
        this.maxVelocityX = maxVelocityX
        this.enemySpeed = enemySpeed;
        this.enemyLeft = enemyLeft;
        this.enemyRight = enemyRight;
    }

    preload = function(){
        this.load.image('background', 'Assets/background.png');
        this.load.spritesheet('player', 'Assets/walkingSpritesheet.png',{frameWidth: 32, frameHeight: 32 });
        this.load.image('platform', 'Assets/platform.png');
        this.load.spritesheet('bullets', 'Assets/walkingSpritesheet.png',{frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('health', 'Assets/walkingSpritesheet.png',{frameWidth: 32, frameHeight: 32 });
        this.load.image('diamond', 'Assets/diamond.png')
        this.load.image('greenHB', 'Assets/greenHB.png');
        this.load.image('redHB', 'Assets/redHB.png');
    };

    // create the assets
    create = function(){
        let gameWidth = this.sys.game.config.width;
        let gameHeight = this.sys.game.config.height;
        //create background
            let bg = this.add.sprite(0,0, 'background');
            bg.setPosition(gameWidth/2, gameHeight/2);
            bg.setScale(0.8,0.7);
        // creating platform 
            platform = this.physics.add.staticGroup();
            platform.create(300, 350, 'platform').setScale(2).refreshBody();

            platform.create(50, 120, 'platform');
            platform.create(600, 200, 'platform');
            platform.create(100, 250, 'platform');
            cursor = this.input.keyboard.createCursorKeys();
        //creating player
            player = this.physics.add.sprite(playerX, playerY, 'player');
            player.body.collideWorldBounds = true;
            this.physics.add.collider(player, platform);
            this.physics.add.collider(player, enemy);
            player.setBounce(0.1);
        //creating enemy
            enemy = this.physics.add.sprite(enemyX, enemyY, 'player', 1);
            enemy.body.collideWorldBounds = true;
            this.physics.add.collider(enemy, platform);
            this.physics.add.collider(player, enemy, hitEnemy, null, this);
            enemy.setBounce(0.1);
            enemy.setVelocityX(enemySpeed);
        // creating bullet
        
        //diamond create
            diamond = this.add.group();
            diamond.enableBody = true;
            for(let i = 0; i < 12; i++){
                diamond = this.physics.add.sprite(i * 70, 0, 'diamond');
                diamond.setBounce(0.1);  
                diamond.body.collideWorldBounds = true;
                this.physics.add.collider(diamond, platform); 
                this.physics.add.collider(player, diamond, collectDiamond, null, this);
                diamond.setScale(0.5);
            }
            //diamond Scores
                diamond = this.add.sprite(510, 20, 'diamond');
                scoreText = this.add.text(530, 15, 'score: 0', { fontSize: '20px', fill: '#000' });
        // Health creation
           backGroundBar = this.add.image(100, 20, 'redHB');
           backGroundBar.fixedToCamera = true;

           healthBar = this.add.image(gameBarX, 20, 'greenHB');
           healthBar.fixedToCamera = true;

           healthLabel = this.add.text(5, 30, 'Health ' + playerHealth, {fontsize: '20px', fill:'#ffffff'});
           healthLabel.fixedToCamera = true;
    }
    // player movement
    update = function(){
        if(cursor.right.isDown){
            player.body.setVelocityX(maxVelocityX);
        }else if(cursor.left.isDown){    
            player.body.setVelocityX(-maxVelocityX);
        }else{
            player.body.setVelocityX(0);
        }
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
}

// when player collides with enemy player looses health 
// The game stops when players health hits 0
hitEnemy = function(player, enemy){
    playerHealth -= 10;
    if(playerHealth >= 0){
        healthLabel.setText("Health: " + playerHealth);
        healthBar.setScale(playerHealth/playerMaxHealth, 1);
    }
    if(playerHealth <= 0){
        this.physics.pause();
        player.setTint(0xff0000);
        gameOver = true;
        
    }
    // health.disableBody(true, true);
    
}
// Score of player
    collectDiamond = function(player, diamond){
        diamond.disableBody(true, true);
        score += 10;
        scoreText.setText('Score: ' + score);
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
scene: [gameScene]
};
// create a new game, pass the configurations 

let game = new Phaser.Game(config);

// When a new scene is started the following functions are called 
// init() -> this is called once, which is used to initialize certain assets in your scene 
// preload() -> This is where the asset preload is initiated -> all the assets are loaded to memory which then can be used as soon as possible 
// create() -> also called once after the preload function is finished, and the image/sprite is drawn to the canvas
// update()
