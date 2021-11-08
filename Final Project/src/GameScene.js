import { Scene } from "phaser";

let player;
let playerX = 70;
let playerY = 200;
let playerHealth = 100;
let playerMaxHealth = 100;

const maxVelocityX = 200; // maximum player velocity in x direction

let enemy;
let enemyX = 500;
let enemyY = 150;
const enemySpeed = 100; // speed of enemy movement
const enemyLeft = 450; // left bound for enemy
const enemyRight = 600;

let platform;

let health;
let backGroundBar;
let healthBar;
let healthLabel;
let gameBarX = 100;

let gameOverText;

let cursor;
let attackKey;


let playerFacingRight = true;

let diamond;

var score = 0;
var scoreText;

const knockback = 20; // knockback is how many pixels the player moves away from enemy on collision
let healthLossAmount = 10;

class GameScene extends Scene {
  constructor() {
    super('level1')
  }
  preload() {
    //this.load.image("logo", "assets/logo.png");

    this.load.image("background", "Assets/background.png");
    this.load.spritesheet("player", "Assets/PlayerSpriteSheetHorizontal.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("platform", "Assets/platform.png");
    this.load.spritesheet("bullets", "Assets/walkingSpritesheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("health", "Assets/walkingSpritesheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("diamond", "Assets/diamond.png");
    this.load.image("greenHB", "Assets/greenHB.png");
    this.load.image("redHB", "Assets/redHB.png");


  }
  create() {
    const background = this.add.image(0, 0, 'background');
    background.setOrigin(0, 0);
    this.createPlatforms();
    this.createPlayer();
    this.createEnemy();
    this.diamondCreation();
    this.healthCreation();
    this.gameOverText = this.add.text(400, 300, 'Game Over', {
      fontSize: '64px',
      fill: '#000'
    })
    this.gameOverText.setOrigin(0.5);
    this.gameOverText.visible = false;
  }
  update() {
    this.playerMovement();
    this.enemyMovement();

  }

  createPlatforms() {
    this.platform = this.physics.add.staticGroup();
    this.platform.create(300, 360, "platform").setScale(1).refreshBody();
    this.platform.create(50, 120, "platform");
    this.platform.create(600, 200, "platform");
    this.platform.create(100, 250, "platform");
    this.cursor = this.input.keyboard.createCursorKeys();
  }
  createPlayer() {
    this.player = this.physics.add.sprite(playerX, playerY, "player");
    // this.player.body.collideWorldBounds = true;
    this.physics.add.collider(this.player, this.platform);
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
  diamondCreation() {
    this.diamond = this.add.group();
    this.diamond.enableBody = true;
    for (let i = 0; i < 12; i++) {
      this.diamond = this.physics.add.sprite(i * 70, 0, "diamond");
      this.diamond.setBounce(0.1);
      this.diamond.body.collideWorldBounds = true;
      this.physics.add.collider(this.diamond, this.platform);
      this.physics.add.overlap(this.player, this.diamond, this.collectDiamond, null, this);
      this.diamond.setScale(0.5);
    }
    this.diamond = this.add.sprite(480, 20, "diamond");
    this.scoreText = this.add.text(500, 15, "Score: 0", {
      fontSize: "20px",
      fill: "#000",
    });
  }
  healthCreation() {
    this.backGroundBar = this.add.image(100, 20, "redHB");
    this.backGroundBar.fixedToCamera = true;

    this.healthBar = this.add.image(gameBarX, 20, "greenHB");
    this.healthBar.fixedToCamera = true;

    this.healthLabel = this.add.text(5, 30, "Health " + playerHealth, {
      fontsize: "20px",
      fill: "#ffffff",
    });
    this.healthLabel.fixedToCamera = true;
  }

  playerMovement() {
    if (this.cursor.right.isDown) {
      this.player.body.setVelocityX(maxVelocityX);
      this.player.anims.play("right", true);
      //if player was not facing right before, flip them to face right
      if (!this.playerFacingRight) {
        this.player.toggleFlipX();
        this.playerFacingRight = true;
      }
      //if left arrow is pressed, move them left and animate also
    } else if (this.cursor.left.isDown) {
      this.player.body.setVelocityX(-maxVelocityX);
      this.player.anims.play("right", true);
      //if player was not facing left before, flip them to face left
      if (this.playerFacingRight) {
        this.player.toggleFlipX();
        this.playerFacingRight = false;
      }
      //player punch
    } else if (this.cursor.down.isDown) {
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
  collectDiamond(player, diamond) {
    diamond.disableBody(true, true);
    score += 10;
    this.scoreText.setText("Score: " + score);
  };

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
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.gameOver = true;
        this.gameOverText.visible = true;
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
}

export default GameScene;
