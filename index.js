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
    let playerFacingRight = true;
    //let attackKey;

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
    const knockback = 20;       // knockback is how many pixels the player moves away from enemy on collision

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
        this.load.spritesheet('player', 'Assets/PlayerSpriteSheetHorizontal.png',{frameWidth: 32, frameHeight: 32 });
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
            //this.attackKey = this.input.keyboard.addKey(Phaser.Keyboard.A);

        //creating player
            player = this.physics.add.sprite(playerX, playerY, 'player');
            player.body.collideWorldBounds = true;
            this.physics.add.collider(player, platform);
            this.physics.add.collider(player, enemy);
            player.setBounce(0.1);

            //create player animations
            // this.anims.create({
            //     key: 'left',
            //     frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
            //     frameRate: 10,
            //     repeat: 1
            // });

            this.anims.create({
                key: 'still',
                frames: [ { key: 'player', frame: 1 } ],
                frameRate: 20
            });

            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'jump',
                frames: [ { key: 'player', frame: 5 } ],
                frameRate: 20
            });

            this.anims.create({
                key: 'punch',
                frames: this.anims.generateFrameNumbers('player', { start: 7, end: 12 }),
                frameRate: 15,
                repeat: -1
            });

            // this.input.keyboard.on('keydown_A', function () {
            //     player.anims.play('punch', true);
            // }

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
                this.physics.add.overlap(player, diamond, collectDiamond, null, this);
                diamond.setScale(0.5);
            }
            //diamond Scores
                diamond = this.add.sprite(480, 20, 'diamond');
                scoreText = this.add.text(500, 15, 'Score: 0', { fontSize: '20px', fill: '#000' });
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
        //if right arrow is pressed, move them right and animate also
        if(cursor.right.isDown){
            player.body.setVelocityX(maxVelocityX);
            player.anims.play('right', true);
            //if player was not facing right before, flip them to face right
            if(!playerFacingRight){
                player.toggleFlipX();
                playerFacingRight = true;
            }
            //if left arrow is pressed, move them left and animate also
        }else if(cursor.left.isDown){    
            player.body.setVelocityX(-maxVelocityX);
            player.anims.play('right', true);
            //if player was not facing left before, flip them to face left
            if(playerFacingRight){
                player.toggleFlipX();
                playerFacingRight = false;
            }
            //player punch
        }else if(cursor.down.isDown){
            player.anims.play('punch', true);
        }else{  //if no keys are pressed, stop their x motion and stop animating
            player.anims.play('still', true);
            player.body.setVelocityX(0);
        }
        //if up arrow is pressed while character is standing on a surface, player jumps
        if(cursor.up.isDown && (player.body.onFloor() /*|| player.body.onWall()*/)){
            player.setVelocityY(-250);
            //player.anims.play('jump', true);
        }
        if(!player.body.onFloor()){
            player.anims.play('jump', true);
        }
        
        // enemy movement
        // moves enemy back and forth
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

// when player collides with enemy player loses health 
// The game stops when players health hits 0
hitEnemy = function(player, enemy){

    // if player jumps on enemy's head, kill enemy
    if(player.y < enemy.y - 30){
        enemy.disableBody(true, true);
    }else if(player.anims.isPlaying && player.anims.currentAnim.key === 'punch' && 
    ((playerFacingRight && player.x < enemy.x) || (!playerFacingRight && player.x >= enemy.x))){
        // if player is facing enemy and punching, kill enemy. player does not move
        enemy.disableBody(true, true);
        player.body.setVelocityX(0);
    }else{  //if player touches enemy from the side, player loses health
        playerHealth -= 10;
        if(playerHealth >= 0){
            healthLabel.setText("Health: " + playerHealth);
            //healthBar.setScale(playerHealth/playerMaxHealth, 1);
        }
        //move green health bar off screen for player health lost
        healthBar.x -= gameBarX/5;
        if(playerHealth <= 0){
            console.log("Call gameOver Scene here! Don't pause the physics");
            this.physics.pause();
            player.setTint(0xff0000);
            gameOver = true;
            
        }
        // health.disableBody(true, true);
        // knockback player on collision with enemy from side and have enemy move away from player
        if(player.x < enemy.x){
            player.x -= knockback;
            enemy.setVelocityX(enemySpeed);
        }
        else{
            player.x += knockback;
            enemy.setVelocityX(-enemySpeed);
        }

    }
    
}
// update score of player when they pick up a diamond and have the diamond disappear
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
