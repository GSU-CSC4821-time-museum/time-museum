import { Scene } from 'phaser'

let player;
let playerX = 70;
let playerY = 200;
let playerHealth = 100;
let playerMaxHealth = 100;
let playerJumpLimit = 400;

const maxVelocityX = 150; // maximum player velocity in x direction

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


const frameAnimation = (scene, y, count, layer, scrollFactor, scale) => {
  let x = 0;

  for(let i = 0; i < count; i++){
      const m = scene.add.image(x, y, layer)
        .setOrigin()
        .setScrollFactor(scrollFactor)
        .setScale(scale)

      x += m.width
    }
 }

class GameScene2 extends Scene {
  constructor(){
    super('level2');
  }

  preload(){
    this.load.image('layer1', 'Assets/Scene2/layer-1.png');
    this.load.image('layer2', 'Assets/Scene2/layer-2.png');
    this.load.image('layer3', 'Assets/Scene2/layer-3.png');
    this.load.image('layer4', 'Assets/Scene2/layer-4.png');
    // this.load.image('layer5', 'Assets/Scene2/layer-5.png');
    this.load.image('layer5', 'Assets/platform.png');
    this.cursors = this.input.keyboard.createCursorKeys();

    this.load.spritesheet("player", "Assets/PlayerSpriteSheetHorizontal.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }
  create(){
    this.background();
    this.platform();
    this.player();
  }
  update(){
    this.BackgroundAndPlayerMovementAnimation();
    // this.playerMovement();
  }

  background(){
    const width = this.scale.width
    const height = this.scale.height
    const offseter = 350;
    const frameCount = 1000;

    //layer 1
    this.add.image(width * 0.5, height * 0.5, 'layer1')
      .setScrollFactor(0)

    //layer 2
    frameAnimation(this, height-offseter, frameCount, 'layer2', 0.25, 1);

    //layer3
    frameAnimation(this, height-(offseter-50), frameCount, 'layer3', 0.5, 1);

    //layer4
    frameAnimation(this, height-offseter, frameCount, 'layer4', 1, 1)

    this.cameras.main.setBounds(0, 0, width * frameCount, height);
  }

  platform(){
    this.platform = this.physics.add.staticGroup();
    //ground
    this.platformCreate(200, 585, 10000, 1, 400);
    //platforms
    this.platformCreate(400, 400, 1, 1, 0);
    this.platformCreate(600, 300, 1, 1, 0);

    this.platformCreate(1200, 400, 1, 1, 0);
    this.platformCreate(1500, 300, 1, 1, 0);



  }

  player(){
    this.player = this.physics.add.sprite(playerX, playerY, "player").setScale(1.5);
    // this.player.body.collideWorldBounds = true;
    this.physics.add.collider(this.player, this.platform);
    // this.physics.add.collider(this.player, this.enemy);
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

  platformCreate(x, y, count, scale, spacing){
    for(let i = 0; i < count; i++){
        this.platform.create(x, y, 'layer5').setScale(scale);
        x += spacing;
    }
  }
  BackgroundAndPlayerMovementAnimation(){
    const cam = this.cameras.main
    const speed = 2;

    //left key
    if(this.cursors.left.isDown){
      cam.scrollX -= speed;

      this.player.body.setVelocityX(-maxVelocityX);
      this.player.anims.play("right", true);
      //if player was not facing left before, flip them to face left
      if (this.playerFacingRight) {
        this.player.toggleFlipX();
        this.playerFacingRight = false;
      }
    //left key
    }else if(this.cursors.right.isDown){
        cam.scrollX += speed;

        this.player.body.setVelocityX(maxVelocityX);
        this.player.anims.play("right", true);
        //if player was not facing right before, flip them to face right
        if (!this.playerFacingRight) {
          this.player.toggleFlipX();
          this.playerFacingRight = true;
        }
      }else if (this.cursors.down.isDown) {
        this.player.anims.play("punch", true);
      } else {
        //if no keys are pressed, stop their x motion and stop animating
        this.player.anims.play("still", true);
        this.player.body.setVelocityX(0);
      }
      //if up arrow is pressed while character is standing on a surface, player jumps
      if (this.cursors.up.isDown && this.player.body.onFloor() /*|| player.body.onWall()*/ ) {
        this.player.setVelocityY(-playerJumpLimit);
        //player.anims.play('jump', true);
      }
      if (!this.player.body.onFloor()) {
        this.player.anims.play("jump", true);
      }

}
}
export default GameScene2
