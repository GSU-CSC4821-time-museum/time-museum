import { Scene } from "phaser";


let player;
let playerX = 1000;
let playerY = 2600;
let playerHealth = 100;
let playerMaxHealth = 100;
let items;
let itemsArr = new Array(2);

const maxVelocityX = 200; // maximum player velocity in x direction

let enemy;
let enemyX = 500;
let enemyY = 150;
const enemySpeed = 100; // speed of enemy movement
const enemyLeft = 450; // left bound for enemy
const enemyRight = 600;

let platform;
let movingPlatform;

let health;
let backGroundBar;
let healthBar;
let healthLabel;
let gameBarX = 100;
let ExitDoor;

let gameOverText;

let gameOverState = false;

let cursor;
let attackKey;


let playerFacingRight = true;

let diamond;

var score = 0;
var scoreText;
let numItems = 0;

let tempItem;

const knockback = 20; // knockback is how many pixels the player moves away from enemy on collision
let healthLossAmount = 10;

class GameScene3 extends Scene {
  constructor() {
    super('level3')
  }
  preload() {
    //this.load.image("logo", "assets/logo.png");

    this.load.image("background", "Assets/world3.png");
    this.load.spritesheet("player", "Assets/PlayerSpriteSheetHorizontal.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("platform", "Assets/platform.png");
    // this.load.spritesheet("bullets", "Assets/walkingSpritesheet.png", {
    //   frameWidth: 32,
    //   frameHeight: 32,
    // });
    // this.load.spritesheet("health", "Assets/walkingSpritesheet.png", {
    //   frameWidth: 32,
    //   frameHeight: 32,
    // });
    this.load.image("diamond", "Assets/diamond.png");
    this.load.image("greenHB", "Assets/greenHB.png");
    this.load.image("redHB", "Assets/redHB.png");

    this.load.image("CavemanRobes", "assets/items/CavemanRobes.png");
    this.load.image("CureAllPotion", "assets/items/CureAllPotion.png");
    this.load.image("DinosaurBone", "assets/items/DinosaurBone.png");
    this.load.image("NES", "assets/items/NES.png");
    this.load.image("PoisonedBerry", "assets/items/PoisonedBerry.png");
    this.load.image("RubixCube", "assets/items/RubixCube.png");
    this.load.image("SignedBCPoster", "assets/items/SignedBCPoster.png");
    this.load.image("TalkingToothbrush", "assets/items/TalkingToothbrush.png");
    this.load.image("ToyRobot", "assets/items/ToyRobot.png");
    this.load.image("whiteTile", "assets/Blank.png");
    this.load.image("whitePlatform", "assets/Blank2.png");


  }
  create() {
    const background = this.add.image(0, 0, 'background').setScale(1).setScrollFactor(1);;
    background.setOrigin(0, 0);
    this.createPlatforms();
    this.createCollision();
    this.createLong();
    this.createPlayer();
    this.createEnemy();
    this.diamondCreation(500, 200, "CavemanRobes");
    this.diamondCreation(100, 100, "DinosaurBone");
    this.diamondCreation(400, 400, "PoisonedBerry");
    this.healthCreation();
    // this.createMovingPlatforms();
    this.ExitCreation();
    this.UpdateItems();
    attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

    this.gameOverText = this.add.text(400, 300, 'Game Over', {
      fontSize: '64px',
      fill: '#000'
    })
    this.gameOverText.setOrigin(0.5);
    this.gameOverText.visible = false;

    this.cameras.main.startFollow(this.player);

  }
  update() {
    this.playerMovement();
    this.enemyMovement();
    // this.platformMovement();
    if(this.player.y > 650){
      //this.gameOver();
    }
  }
  // createMovingPlatforms(){
  //   this.movingPlatform = this.add.group();
  //   this.movingPlatform.create(60, 100, "platform");

  // }
  createPlatforms() {
    this.platform = this.physics.add.staticGroup();
    //bottom platform
    // this.platform.create(200, 582, "platform").setScale(1).refreshBody();
    // this.platform.create(600, 582, "platform").setScale(1).refreshBody();

    //Floor 1
    let plat1 = this.platform.create(1000, 2704, "platform").setAlpha(0.5);
    let plat2 = this.platform.create(1400, 2704, "platform").setAlpha(0.5);
    let plat5 = this.platform.create(1800, 2704, "platform").setAlpha(0.5);
    let plat6 = this.platform.create(2200, 2704, "platform").setAlpha(0.5);
    let plat7 = this.platform.create(2600, 2704, "platform").setAlpha(0.5);
    let plat8 = this.platform.create(3000, 2704, "platform").setAlpha(0.5);

    //Floor 2
    let plat3 = this.platform.create(1000, 2576, "platform").setAlpha(0.5);
    let plat4 = this.platform.create(1367, 2576, "platform").setAlpha(0.5);
    let plat9 = this.platform.create(1927, 2576, "platform").setAlpha(0.5);
    let plat10 = this.platform.create(2233, 2576, "platform").setAlpha(0.5);
    let plat11 = this.platform.create(2792, 2576, "platform").setAlpha(0.5);
    let plat23 = this.platform.create(3000, 2576, "platform").setAlpha(0.5);

    //Floor 3
    let plat12 = this.platform.create(1095, 2448, "platform").setAlpha(0.5);
    let plat13 = this.platform.create(1400, 2448, "platform").setAlpha(0.5);
    let plat14 = this.platform.create(1800, 2448, "platform").setAlpha(0.5);
    let plat15 = this.platform.create(2200, 2448, "platform").setAlpha(0.5);
    let plat16 = this.platform.create(2487, 2448, "platform").setAlpha(0.5);
    let plat22 = this.platform.create(3081, 2448, "platform").setAlpha(0.5);

    //Floor 4
    let plat17 = this.platform.create(1000, 2320, "platform").setAlpha(0.5);
    let plat18 = this.platform.create(1400, 2320, "platform").setAlpha(0.5);
    //let plat19 = this.platform.create(1600, 2320, "platform").setAlpha(0.5);
    let plat20 = this.platform.create(2151, 2320, "platform").setAlpha(0.5);
    let plat21 = this.platform.create(2551, 2320, "platform").setAlpha(0.5);
    let plat29 = this.platform.create(2951, 2320, "platform").setAlpha(0.5);

    //Floor 5
    let plat24 = this.platform.create(791, 2191, "platform").setAlpha(0.5);
    let plat25 = this.platform.create(1288, 2191, "platform").setAlpha(0.5);
    let plat26 = this.platform.create(1688, 2191, "platform").setAlpha(0.5);
    let plat27 = this.platform.create(1911, 2191, "platform").setAlpha(0.5);
    let plat28 = this.platform.create(2407, 2191, "platform").setAlpha(0.5);
    let plat31 = this.platform.create(2807, 2191, "platform").setAlpha(0.5);

    //Floor 6
    let plat30 = this.platform.create(919, 2064, "platform").setAlpha(0.5);
    //let plat32 = this.platform.create(2280, 2064, "platform").setAlpha(0.5);
    let plat33 = this.platform.create(919, 2064, "platform").setAlpha(0.5);
    let plat34 = this.platform.create(919, 2064, "platform").setAlpha(0.5);
    let plat35 = this.platform.create(919, 2064, "platform").setAlpha(0.5);

    //Floor 7
    let plat36 = this.platform.create(1000, 1872, "platform").setAlpha(0.5);
    let plat37 = this.platform.create(1016, 1872, "platform").setAlpha(0.5);
    let plat38 = this.platform.create(1016, 1872, "platform").setAlpha(0.5);
    let plat39 = this.platform.create(1016, 1872, "platform").setAlpha(0.5);
    let plat40 = this.platform.create(1016, 1872, "platform").setAlpha(0.5);

    //Floor 8
    let plat41 = this.platform.create(1000, 1744, "platform").setAlpha(0.5);
    let plat42 = this.platform.create(1400, 1744, "platform").setAlpha(0.5); 
    let plat43 = this.platform.create(1800, 1744, "platform").setAlpha(0.5); 
    let plat44 = this.platform.create(2200, 1744, "platform").setAlpha(0.5); 
    let plat45 = this.platform.create(2600, 1744, "platform").setAlpha(0.5);
    let plat46 = this.platform.create(2744, 1744, "platform").setAlpha(0.5);
    
    //Floor 9
    let plat47 = this.platform.create(1128, 1616, "platform").setAlpha(0.5);
    let plat48 = this.platform.create(1528, 1616, "platform").setAlpha(0.5);
    let plat49 = this.platform.create(1928, 1616, "platform").setAlpha(0.5);
    let plat50 = this.platform.create(2328, 1616, "platform").setAlpha(0.5);
    let plat51 = this.platform.create(2728, 1616, "platform").setAlpha(0.5);
    let plat52 = this.platform.create(3128, 1616, "platform").setAlpha(0.5);

    //Floor 10
    let plat53 = this.platform.create(855, 1488, "platform").setAlpha(0.5);

    //Floor 12
    let plat54 = this.platform.create(855, 1232, "platform").setAlpha(0.5);
    let plat57 = this.platform.create(2856, 1168, "platform").setAlpha(0.5);
    let plat58 = this.platform.create(3000, 1168, "platform").setAlpha(0.5);

    //Ceiling
    let plat55 = this.platform.create(1000, 976, "platform").setAlpha(0.5);
    let plat56 = this.platform.create(1400, 976, "platform").setAlpha(0.5);
    let plat59 = this.platform.create(1800, 976, "platform").setAlpha(0.5);
    let plat60 = this.platform.create(2200, 976, "platform").setAlpha(0.5);
    let plat61 = this.platform.create(2600, 976, "platform").setAlpha(0.5);
    let plat62 = this.platform.create(3000, 976, "platform").setAlpha(0.5);

    // this.platform.visible = false;
    // this.plat1.setAlpha(.5);
    this.cursor = this.input.keyboard.createCursorKeys();


  }

  createCollision() {
    this.tile = this.physics.add.staticGroup();
    //Bottom Tiles
    let tile1 = this.tile.create(1200, 1104, "whiteTile").setAlpha(0.5);
    let tile2 = this.tile.create(1136, 1104, "whiteTile").setAlpha(0.5);
    let tile3 = this.tile.create(1104, 1104, "whiteTile").setAlpha(0.5);
    let tile4 = this.tile.create(1072, 1104, "whiteTile").setAlpha(0.5);
    let tile5 = this.tile.create(1040, 1104, "whiteTile").setAlpha(0.5);
    let tile6 = this.tile.create(1008, 1104, "whiteTile").setAlpha(0.5);
    let tile7 = this.tile.create(976, 1104, "whiteTile").setAlpha(0.5);
    let tile8 = this.tile.create(944, 1104, "whiteTile").setAlpha(0.5);
    let tile9 = this.tile.create(912, 1104, "whiteTile").setAlpha(0.5);

    //Floor
    let tile16 = this.tile.create(1200, 1360, "whiteTile").setAlpha(0.5);
    let tile17 = this.tile.create(1136, 1360, "whiteTile").setAlpha(0.5);
    let tile18 = this.tile.create(1104, 1360, "whiteTile").setAlpha(0.5);
    let tile19 = this.tile.create(1072, 1360, "whiteTile").setAlpha(0.5);
    let tile20 = this.tile.create(1040, 1360, "whiteTile").setAlpha(0.5);
    let tile21 = this.tile.create(1008, 1360, "whiteTile").setAlpha(0.5);
    let tile22 = this.tile.create(976, 1360, "whiteTile").setAlpha(0.5);
    let tile23 = this.tile.create(944, 1360, "whiteTile").setAlpha(0.5);
    let tile24 = this.tile.create(912, 1360, "whiteTile").setAlpha(0.5);

    //Jumps
    let tile10 = this.tile.create(1200, 1296, "whiteTile").setAlpha(0.5);
    let tile11 = this.tile.create(1264, 1200, "whiteTile").setAlpha(0.5);
    let tile12 = this.tile.create(1264, 1392, "whiteTile").setAlpha(0.5);
    let tile13 = this.tile.create(1200, 1488, "whiteTile").setAlpha(0.5);
    let tile14 = this.tile.create(912, 1104, "whiteTile").setAlpha(0.5);
    let tile15 = this.tile.create(912, 1104, "whiteTile").setAlpha(0.5);
    
    //Final Jumps
    let tile25 = this.tile.create(1744, 1552, "whiteTile").setAlpha(0.5);
    let tile26 = this.tile.create(1776, 1552, "whiteTile").setAlpha(0.5);

    let tile34 = this.tile.create(1872, 1488, "whiteTile").setAlpha(0.5);
    let tile27 = this.tile.create(1904, 1488, "whiteTile").setAlpha(0.5);

    let tile28 = this.tile.create(2000, 1424, "whiteTile").setAlpha(0.5);
    let tile29 = this.tile.create(2032, 1424, "whiteTile").setAlpha(0.5);

    let tile30 = this.tile.create(2128, 1360, "whiteTile").setAlpha(0.5);
    let tile31 = this.tile.create(2160, 1360, "whiteTile").setAlpha(0.5);

    let tile32 = this.tile.create(2256, 1296, "whiteTile").setAlpha(0.5);
    let tile33 = this.tile.create(2288, 1296, "whiteTile").setAlpha(0.5);

    let tile38 = this.tile.create(2384, 1232, "whiteTile").setAlpha(0.5);
    let tile35 = this.tile.create(2416, 1232, "whiteTile").setAlpha(0.5);

    let tile36 = this.tile.create(2512, 1168, "whiteTile").setAlpha(0.5);
    let tile37 = this.tile.create(2544, 1168, "whiteTile").setAlpha(0.5);


    //this.cursor = this.input.keyboard.createCursorKeys();
  }

  createLong() {
    this.long = this.physics.add.staticGroup();

    //Left Side
    let long1 = this.long.create(784, 2600, "whitePlatform").setAlpha(0.5);
    let long2 = this.long.create(784, 2440, "whitePlatform").setAlpha(0.5);
    let long3 = this.long.create(784, 2280, "whitePlatform").setAlpha(0.5);
    let long4 = this.long.create(784, 2120, "whitePlatform").setAlpha(0.5);
    let long5 = this.long.create(784, 1960, "whitePlatform").setAlpha(0.5);
    let long6 = this.long.create(784, 1800, "whitePlatform").setAlpha(0.5);
    let long7 = this.long.create(784, 1640, "whitePlatform").setAlpha(0.5);
    let long8 = this.long.create(784, 1480, "whitePlatform").setAlpha(0.5);
    let long9 = this.long.create(784, 1320, "whitePlatform").setAlpha(0.5);
    let long10 = this.long.create(784, 1160, "whitePlatform").setAlpha(0.5);
    let long11 = this.long.create(784, 1000, "whitePlatform").setAlpha(0.5);

    //Right Side
    let long12 = this.long.create(3120, 2600, "whitePlatform").setAlpha(0.5);
    let long13 = this.long.create(3120, 2440, "whitePlatform").setAlpha(0.5);
    let long14 = this.long.create(3120, 2280, "whitePlatform").setAlpha(0.5);
    let long15 = this.long.create(3120, 2120, "whitePlatform").setAlpha(0.5);
    let long16 = this.long.create(3120, 1960, "whitePlatform").setAlpha(0.5);
    let long17 = this.long.create(3120, 1800, "whitePlatform").setAlpha(0.5);
    let long18 = this.long.create(3120, 1640, "whitePlatform").setAlpha(0.5);
    let long19 = this.long.create(3120, 1480, "whitePlatform").setAlpha(0.5);
    let long20 = this.long.create(3120, 1320, "whitePlatform").setAlpha(0.5);
    let long21 = this.long.create(3120, 1160, "whitePlatform").setAlpha(0.5);
    let long22 = this.long.create(3120, 1000, "whitePlatform").setAlpha(0.5);

    // More
    let long23 = this.long.create(1168, 1168, "whitePlatform").setAlpha(0.5);
    let long24 = this.long.create(1168, 1328, "whitePlatform").setAlpha(0.5);
    let long25 = this.long.create(1168, 1488, "whitePlatform").setAlpha(0.5);
    let long26 = this.long.create(1168, 1500, "whitePlatform").setAlpha(0.5);
    let long27 = this.long.create(1296, 1328, "whitePlatform").setAlpha(0.5);
    let long28 = this.long.create(1296, 1423, "whitePlatform").setAlpha(0.5);
    let long29 = this.long.create(1296, 1168, "whitePlatform").setAlpha(0.5);
    let long30 = this.long.create(1296, 1008, "whitePlatform").setAlpha(0.5);
    let long31 = this.long.create(1168, 1168, "whitePlatform").setAlpha(0.5);
    
  }

  createPlayer() {
    this.player = this.physics.add.sprite(playerX, playerY, "player");
    // this.player.body.collideWorldBounds = true;
    this.physics.add.collider(this.player, this.platform);
    this.physics.add.collider(this.player, this.tile);
    this.physics.add.collider(this.player, this.long);
    this.physics.add.collider(this.player, this.enemy);
    this.player.setBounce(0.1);

    this.anims.create({
      key: "still",
      frames: [{
        key: "player",
        frame: 1
      }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1,
    });


    this.anims.create({
      key: "jump",
      frames: [{
        key: "player",
        frame: 5
      }],
      frameRate: 20,
    });

    this.anims.create({
      key: "punch",
      frames: this.anims.generateFrameNumbers("player", {
        start: 7,
        end: 12
      }),
      frameRate: 15,
      repeat: -1,
    });
  }
  createEnemy() {
    this.enemy = this.physics.add.sprite(enemyX, enemyY, "player", 1);
    this.enemy.body.collideWorldBounds = true;
    this.physics.add.collider(this.enemy, this.tile);
    this.physics.add.collider(this.enemy, this.long);
    this.physics.add.collider(this.enemy, this.platform);
    this.physics.add.collider(this.player, this.enemy, this.hitEnemy, null, this);
    this.enemy.setBounce(0.1);
    this.enemy.setVelocityX(enemySpeed);
  }
  diamondCreation(x, y, item_name) {
    this.diamond = this.add.group();
    this.diamond.enableBody = true;
    this.diamond = this.physics.add.sprite(x, y, item_name);
    this.diamond.setBounce(0.1);
    this.diamond.body.collideWorldBounds = true;
    this.physics.add.collider(this.diamond, this.platform);
    this.physics.add.overlap(this.player, this.diamond, this.collectDiamond, null, this);
    this.diamond.setScale(1);

    this.diamond = this.add.sprite(480, 20, "diamond").setScrollFactor(0);
    this.scoreText = this.add.text(500, 15, "Score: ", {
      fontSize: "20px",
      fill: "#000",
    });
    this.scoreText.setScrollFactor(0);
  }
  // multiItem(x, y, item){
  //   this.tempItem = this.physics.add.sprite(i * 70, 0, item)
  // }

  healthCreation() {
    this.backGroundBar = this.add.image(100, 20, "redHB");
    // this.backGroundBar.fixedToCamera = true;
    this.backGroundBar.setScrollFactor(0);

    this.healthBar = this.add.image(gameBarX, 20, "greenHB");
    // this.healthBar.fixedToCamera = true;
    this.healthBar.setScrollFactor(0);

    this.healthLabel = this.add.text(5, 30, "Health " + playerHealth, {
      fontsize: "20px",
      fill: "#ffffff",
    });
    // this.healthLabel.fixedToCamera = true;
    this.healthLabel.setScrollFactor(0);
  }

  playerMovement() {
    if (this.cursor.right.isDown) {
      this.player.body.setVelocityX(maxVelocityX);
      this.player.anims.play("right", true);
      //if player was not facing right before, flip them to face right
      if (!playerFacingRight) {
        this.player.toggleFlipX();
      }
      playerFacingRight = true;
      //if left arrow is pressed, move them left and animate also
    } else if (this.cursor.left.isDown) {
      this.player.body.setVelocityX(-maxVelocityX);
      this.player.anims.play("right", true);
      //if player was not facing left before, flip them to face left
      if (playerFacingRight) {
        this.player.toggleFlipX();
      }
      playerFacingRight = false;
      //player punch
    } else if(attackKey.isDown) {
      console.log('A key pressed - punch');
      this.player.anims.play("punch", true);
   } else {
      //if no keys are pressed, stop their x motion and stop animating
      this.player.anims.play("still", true);
      this.player.body.setVelocityX(0);
    }
    //if up arrow is pressed while character is standing on a surface, player jumps
    if (this.cursor.up.isDown && this.player.body.onFloor() /*|| player.body.onWall()*/ ) {
      this.player.setVelocityY(-300);
      //player.anims.play('jump', true);
    }
    if (!this.player.body.onFloor()) {
      this.player.anims.play("jump", true);
    }


  }
  enemyMovement() {
    if (this.enemy.x > enemyRight && this.enemy.body.velocity.x > 0) {
      this.enemy.setVelocityX(-enemySpeed);
    } else if (this.enemy.x < enemyLeft && this.enemy.body.velocity.x < 0) {
      this.enemy.setVelocityX(enemySpeed);
    } else if (this.enemy.body.velocity.x == 0) {
      this.enemy.setVelocityX(enemySpeed);
    }
  }
  // platformMovement(){
  //   console.log(this.movingPlatform)
  // }
  collectDiamond(player, diamond) {
    diamond.disableBody(true, true);
    score += 10;
    this.scoreText.setText("Score: " + score);
  };

  ExitCreation(){
    this.ExitDoor = this.physics.add.sprite(760, 450, "player");
    this.physics.add.collider(this.ExitDoor, this.platform);
    this.physics.add.overlap(this.ExitDoor, this.player, this.Exit, null, this);
  }
  hitEnemy(player, enemy) {
    if (this.player.y < this.enemy.y - 30) {
      this.enemy.disableBody(true, true);
    } else if (player.anims.isPlaying && player.anims.currentAnim.key === "punch" &&
      ((playerFacingRight && player.x < enemy.x) ||
        (!playerFacingRight && player.x >= enemy.x))) {
      this.enemy.disableBody(true, true);
      player.setVelocityX(0);
    } else {
      //if player touches enemy from the side, player loses health
      playerHealth -= 10;
      if (playerHealth >= 0) {
        this.healthLabel.setText("Health: " + playerHealth);
        //healthBar.setScale(playerHealth/playerMaxHealth, 1);
      }
      //move green health bar off screen for player health lost
      this.healthBar.x -= 2 * (healthLossAmount);
      // console.log(this.healthBar.x);
      if (playerHealth <= 0) {
        console.log("Call gameOver Scene here! Don't pause the physics");
        this.player.setTint(0xff0000);
        this.gameOver();
      }
      // health.disableBody(true, true);
      // knockback player on collision with enemy from side and have enemy move away from player
      if (this.player.x < this.enemy.x) {
        this.player.x -= knockback;
        this.enemy.setVelocityX(enemySpeed);
      } else {
        this.player.x += knockback;
        this.enemy.setVelocityX(-enemySpeed);
      }
    }
  }
  gameOver(){
    this.physics.pause();
    this.gameOverState = true;
    this.gameOverText.setScrollFactor(0);
    this.gameOverText.visible = true;
    this.input.on('pointerdown', () => this.scene.start('intro'))

  }
  Exit(){
    console.log("collision");
    this.scene.start('level2')
  }
  UpdateItems(){
    this.items = this.add.sprite(280, 20, "NES").setScrollFactor(0);
    itemsArr[0] = this.items;
    itemsArr[0].visible = true;
  }
}

export default GameScene3;