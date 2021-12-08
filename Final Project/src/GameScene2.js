import { Scene } from "phaser";


let player;
let playerX = 30;
let playerY = 0;
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

class GameScene2 extends Scene {
  constructor() {
    super('level1')
  }
  preload() {
    //this.load.image("logo", "assets/logo.png");

    this.load.image("background", "Assets/World2_alt.png");
    this.load.spritesheet("player", "Assets/PlayerSpriteSheetHorizontal.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("Caveman1", "assets/items/Caveman1.png", {
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
    this.CureAllPotionCreation(500, 200);
    this.ToyRobotCreation(100, 100);
    this.TalkingToothbrush(450, 400);
    this.healthCreation();
    this.ExitCreation();
    attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

    this.gameOverText = this.add.text(400, 300, 'Game Over.\nClick to\ntry again.', {
      fontSize: '64px',
      fill: '#000'
    })
    this.gameOverText.setOrigin(0.5);
    this.gameOverText.visible = false;

    this.cameras.main.startFollow(this.player);

    this.diamond = this.add.sprite(480, 20, "diamond").setScrollFactor(0);
    this.scoreText = this.add.text(500, 15, "Score: " + score, {
      fontSize: "20px",
      fill: "#000",
    });
    this.scoreText.setScrollFactor(0);

  }
  update() {
    this.playerMovement();
    this.enemyMovement();
    // this.platformMovement();
    // if(this.player.y > 650){
    //   this.gameOver();
    // }
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

    //Bottom Floors
    let plat1 = this.platform.create(-40, 65, "platform").setAlpha(0);
    let plat2 = this.platform.create(-40, 80, "platform").setAlpha(0);

    let plat3 = this.platform.create(-107, 465, "platform").setAlpha(0);
    let plat4 = this.platform.create(-107, 480, "platform").setAlpha(0);

    let plat5 = this.platform.create(375, 368, "platform").setAlpha(0);
    let plat6 = this.platform.create(375, 383, "platform").setAlpha(0);

    let plat7 = this.platform.create(200, 927, "platform").setAlpha(0);
    let plat8 = this.platform.create(100, -16, "platform").setAlpha(0);
    // this.platform.visible = false;
    // this.plat1.setAlpha(.5);
    this.cursor = this.input.keyboard.createCursorKeys();


  }

  createCollision() {
    this.tile = this.physics.add.staticGroup();
    //Bottom Tiles
    let tile1 = this.tile.create(65, 145, "whiteTile").setAlpha(0);
    let tile2 = this.tile.create(80, 145, "whiteTile").setAlpha(0);

    let tile3 = this.tile.create(176, 208, "whiteTile").setAlpha(0);
    let tile4 = this.tile.create(191, 208, "whiteTile").setAlpha(0);

    let tile5 = this.tile.create(48, 288, "whiteTile").setAlpha(0);
    let tile6 = this.tile.create(63, 288, "whiteTile").setAlpha(0);

    let tile7 = this.tile.create(176, 529, "whiteTile").setAlpha(0);
    let tile8 = this.tile.create(191, 529, "whiteTile").setAlpha(0);

    let tile9 = this.tile.create(110, 576, "whiteTile").setAlpha(0);
    let tile10 = this.tile.create(98, 576, "whiteTile").setAlpha(0);

    let tile11 = this.tile.create(32, 643, "whiteTile").setAlpha(0);
    let tile12 = this.tile.create(47, 643, "whiteTile").setAlpha(0);

    let tile13 = this.tile.create(208, 658, "whiteTile").setAlpha(0);
    let tile14 = this.tile.create(222, 658, "whiteTile").setAlpha(0);
    
    let tile15 = this.tile.create(113, 735, "whiteTile").setAlpha(0);
    let tile16 = this.tile.create(128, 735, "whiteTile").setAlpha(0);

    let tile17 = this.tile.create(160, 832, "whiteTile").setAlpha(0);
    let tile18 = this.tile.create(175, 832, "whiteTile").setAlpha(0);

    let tile19 = this.tile.create(32, 800, "whiteTile").setAlpha(0);
    let tile20 = this.tile.create(47, 800, "whiteTile").setAlpha(0);

    //this.cursor = this.input.keyboard.createCursorKeys();
  }

  createLong() {
    this.long = this.physics.add.staticGroup();

    //Jump Corridor
    let long1 = this.long.create(-16, 830, "whitePlatform").setAlpha(0);
    let long3 = this.long.create(-16, 670, "whitePlatform").setAlpha(0);
    let long4 = this.long.create(-16, 510, "whitePlatform").setAlpha(0);
    let long5 = this.long.create(-16, 350, "whitePlatform").setAlpha(0);
    let long6 = this.long.create(-16, 190, "whitePlatform").setAlpha(0);
    let long7 = this.long.create(-16, 30, "whitePlatform").setAlpha(0);
    let long8 = this.long.create(-16, -130, "whitePlatform").setAlpha(0);

    let long2 = this.long.create(272, 830, "whitePlatform").setAlpha(0);
    let long9 = this.long.create(272, 670, "whitePlatform").setAlpha(0);
    let long10 = this.long.create(272, 510, "whitePlatform").setAlpha(0);
    let long11 = this.long.create(272, 350, "whitePlatform").setAlpha(0);
    let long12 = this.long.create(272, 190, "whitePlatform").setAlpha(0);
    let long13 = this.long.create(272, 30, "whitePlatform").setAlpha(0);
    let long14 = this.long.create(272, -130, "whitePlatform").setAlpha(0);
    
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
    this.physics.add.collider(this.enemy, this.platform);
    this.physics.add.collider(this.player, this.enemy, this.hitEnemy, null, this);
    this.enemy.setBounce(0.1);
    this.enemy.setVelocityX(enemySpeed);
  }
  // createCaveman(x, y, )
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
  CureAllPotionCreation(x, y){
    this.cavemanRobes = this.add.group();
    this.cavemanRobes.enableBody = true;
    this.cavemanRobes = this.physics.add.sprite(x, y, 'CureAllPotion');
    this.cavemanRobes.setBounce(0.1);
    this.cavemanRobes.body.collideWorldBounds = true;
    this.physics.add.collider(this.cavemanRobes, this.platform);
    this.physics.add.overlap(this.player, this.cavemanRobes, this.collectCureAllPotion, null, this);
    this.cavemanRobes.setScale(1);
  }
  ToyRobotCreation(x, y){
    this.dinosaurBone = this.add.group();
    this.dinosaurBone.enableBody = true;
    this.dinosaurBone = this.physics.add.sprite(x, y, 'ToyRobot');
    this.dinosaurBone.setBounce(0.1);
    this.dinosaurBone.body.collideWorldBounds = true;
    this.physics.add.collider(this.dinosaurBone, this.platform);
    this.physics.add.overlap(this.player, this.dinosaurBone, this.collectToyRobot, null, this);
    this.dinosaurBone.setScale(1);
  }
  TalkingToothbrush(x, y){
    this.poisonedBerry = this.add.group();
    this.poisonedBerry.enableBody = true;
    this.poisonedBerry = this.physics.add.sprite(x, y, 'TalkingToothbrush');
    this.poisonedBerry.setBounce(0.1);
    this.poisonedBerry.body.collideWorldBounds = true;
    this.physics.add.collider(this.poisonedBerry, this.platform);
    this.physics.add.overlap(this.player, this.poisonedBerry, this.collectTalkingToothbrush, null, this);
    this.poisonedBerry.setScale(1);
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
      this.player.setVelocityY(-250);
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
  }
  collectCureAllPotion(player, cavemanRobes){
    cavemanRobes.disableBody(true, true);
    score += 10;
    this.scoreText.setText("Score: " + score);
    this.UpdateItems("CureAllPotion");
  }
  collectToyRobot(player, dinosaurBone){
    dinosaurBone.disableBody(true, true);
    score += 10;
    this.scoreText.setText("Score: " + score);
    this.UpdateItems("ToyRobot");
  }
  collectTalkingToothbrush(player, poisonedBerry){
    poisonedBerry.disableBody(true, true);
    score += 10;
    this.scoreText.setText("Score: " + score);
    this.UpdateItems("TalkingToothbrush");
  }

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
    this.input.on('pointerdown', () => this.scene.start('intro'));

  }
  Exit(){
    console.log("collision");
    if(numItems > 2){
      this.scene.start('End');
    }
  }
  UpdateItems(item_name){
    this.items = this.add.sprite(280 + (32*numItems), 20, item_name).setScrollFactor(0);
    itemsArr[numItems] = this.items;
    itemsArr[numItems].visible = true;
    numItems++;
    console.log('numItems: ' + numItems);
  }
}

export default GameScene2;