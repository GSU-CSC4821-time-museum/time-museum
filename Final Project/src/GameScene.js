// import { Scene } from "phaser";
//
//
// let player;
// let playerX = 70;
// let playerY = 200;
// let playerHealth = 100;
// let playerMaxHealth = 100;
// let items;
// let itemsArr = new Array(2);
//
// const maxVelocityX = 200; // maximum player velocity in x direction
//
// let enemy;
// let enemyX = 500;
// let enemyY = 150;
// const enemySpeed = 100; // speed of enemy movement
// const enemyLeft = 450; // left bound for enemy
// const enemyRight = 600;
//
// let platform;
// let movingPlatform;
//
// let health;
// let backGroundBar;
// let healthBar;
// let healthLabel;
// let gameBarX = 100;
// let ExitDoor;
//
// let gameOverText;
//
// let gameOverState = false;
//
// let cursor;
// let attackKey;
//
//
// let playerFacingRight = true;
//
// let diamond;
//
// var score = 0;
// var scoreText;
//
// let tempItem;
//
// const knockback = 20; // knockback is how many pixels the player moves away from enemy on collision
// let healthLossAmount = 10;
//
// class GameScene extends Scene {
//   constructor() {
//     super('level1')
//   }
//   preload() {
//     //this.load.image("logo", "assets/logo.png");
//
//     this.load.image("background", "Assets/World1.png");
//     this.load.spritesheet("player", "Assets/PlayerSpriteSheetHorizontal.png", {
//       frameWidth: 32,
//       frameHeight: 32,
//     });
//     this.load.image("platform", "Assets/platform.png");
//     this.load.spritesheet("bullets", "Assets/walkingSpritesheet.png", {
//       frameWidth: 32,
//       frameHeight: 32,
//     });
//     this.load.spritesheet("health", "Assets/walkingSpritesheet.png", {
//       frameWidth: 32,
//       frameHeight: 32,
//     });
//     this.load.image("diamond", "Assets/diamond.png");
//     this.load.image("greenHB", "Assets/greenHB.png");
//     this.load.image("redHB", "Assets/redHB.png");
//
//     this.load.image("CavemanRobes", "assets/items/CavemanRobes.png");
//     this.load.image("CureAllPotion", "assets/items/CureAllPotion.png");
//     this.load.image("DinosaurBone", "assets/items/DinosaurBone.png");
//     this.load.image("NES", "assets/items/NES.png");
//     this.load.image("PoisonedBerry", "assets/items/PoisonedBerry.png");
//     this.load.image("RubixCube", "assets/items/RubixCube.png");
//     this.load.image("SignedBCPoster", "assets/items/SignedBCPoster.png");
//     this.load.image("TalkingToothbrush", "assets/items/TalkingToothbrush.png");
//     this.load.image("ToyRobot", "assets/items/ToyRobot.png");
//
//
//   }
//   create() {
//     const background = this.add.image(0, 0, 'background');
//     background.setOrigin(0, 0);
//     this.createPlatforms();
//     this.createPlayer();
//     this.createEnemy();
//     this.diamondCreation("NES");
//     this.healthCreation();
//     this.createMovingPlatforms();
//     this.ExitCreation();
//     this.UpdateItems();
//
//     this.gameOverText = this.add.text(400, 300, 'Game Over', {
//       fontSize: '64px',
//       fill: '#000'
//     })
//     this.gameOverText.setOrigin(0.5);
//     this.gameOverText.visible = false;
//   }
//   update() {
//     this.playerMovement();
//     this.enemyMovement();
//     this.platformMovement();
//     if(this.player.y > 650){
//       this.gameOver();
//     }
//   }
//   createMovingPlatforms(){
//     this.movingPlatform = this.add.group();
//     this.movingPlatform.create(60, 100, "platform");
//
//   }
//   createPlatforms() {
//     this.platform = this.physics.add.staticGroup();
//     //bottom platform
//     // this.platform.create(200, 582, "platform").setScale(1).refreshBody();
//     // this.platform.create(600, 582, "platform").setScale(1).refreshBody();
//
//     this.platform.create(60, 200, "platform");
//     this.platform.create(600, 300, "platform");
//     this.platform.create(100, 400, "platform");
//     this.platform.create(600, 500, "platform");
//     this.cursor = this.input.keyboard.createCursorKeys();
//
//
//   }
//   createPlayer() {
//     this.player = this.physics.add.sprite(playerX, playerY, "player");
//     // this.player.body.collideWorldBounds = true;
//     this.physics.add.collider(this.player, this.platform);
//     this.physics.add.collider(this.player, this.enemy);
//     this.player.setBounce(0.1);
//
//     this.anims.create({
//       key: "still",
//       frames: [{
//         key: "player",
//         frame: 1
//       }],
//       frameRate: 20,
//     });
//
//     this.anims.create({
//       key: "right",
//       frames: this.anims.generateFrameNumbers("player", {
//         start: 0,
//         end: 3
//       }),
//       frameRate: 10,
//       repeat: -1,
//     });
//
//
//     this.anims.create({
//       key: "jump",
//       frames: [{
//         key: "player",
//         frame: 5
//       }],
//       frameRate: 20,
//     });
//
//     this.anims.create({
//       key: "punch",
//       frames: this.anims.generateFrameNumbers("player", {
//         start: 7,
//         end: 12
//       }),
//       frameRate: 15,
//       repeat: -1,
//     });
//   }
//   createEnemy() {
//     this.enemy = this.physics.add.sprite(enemyX, enemyY, "player", 1);
//     this.enemy.body.collideWorldBounds = true;
//     this.physics.add.collider(this.enemy, this.platform);
//     this.physics.add.collider(this.player, this.enemy, this.hitEnemy, null, this);
//     this.enemy.setBounce(0.1);
//     this.enemy.setVelocityX(enemySpeed);
//   }
//   diamondCreation(item_name) {
//     this.diamond = this.add.group();
//     this.diamond.enableBody = true;
//     for (let i = 0; i < 12; i++) {
//       this.diamond = this.physics.add.sprite(i * 70, 0, item_name);
//       this.diamond.setBounce(0.1);
//       this.diamond.body.collideWorldBounds = true;
//       this.physics.add.collider(this.diamond, this.platform);
//       this.physics.add.overlap(this.player, this.diamond, this.collectDiamond, null, this);
//       this.diamond.setScale(0.5);
//     }
//     this.diamond = this.add.sprite(480, 20, "diamond");
//     this.scoreText = this.add.text(500, 15, "Score: 0", {
//       fontSize: "20px",
//       fill: "#000",
//     });
//   }
//   // multiItem(x, y, item){
//   //   this.tempItem = this.physics.add.sprite(i * 70, 0, item)
//   // }
//
//   healthCreation() {
//     this.backGroundBar = this.add.image(100, 20, "redHB");
//     this.backGroundBar.fixedToCamera = true;
//
//     this.healthBar = this.add.image(gameBarX, 20, "greenHB");
//     this.healthBar.fixedToCamera = true;
//
//     this.healthLabel = this.add.text(5, 30, "Health " + playerHealth, {
//       fontsize: "20px",
//       fill: "#ffffff",
//     });
//     this.healthLabel.fixedToCamera = true;
//   }
//
//   playerMovement() {
//     if (this.cursor.right.isDown) {
//       this.player.body.setVelocityX(maxVelocityX);
//       this.player.anims.play("right", true);
//       //if player was not facing right before, flip them to face right
//       if (!playerFacingRight) {
//         this.player.toggleFlipX();
//         playerFacingRight = true;
//       }
//       //if left arrow is pressed, move them left and animate also
//     } else if (this.cursor.left.isDown) {
//       this.player.body.setVelocityX(-maxVelocityX);
//       this.player.anims.play("right", true);
//       //if player was not facing left before, flip them to face left
//       if (playerFacingRight) {
//         this.player.toggleFlipX();
//         playerFacingRight = false;
//       }
//       //player punch
//     } else if (this.cursor.down.isDown) {
//       this.player.anims.play("punch", true);
//     } else {
//       //if no keys are pressed, stop their x motion and stop animating
//       this.player.anims.play("still", true);
//       this.player.body.setVelocityX(0);
//     }
//     //if up arrow is pressed while character is standing on a surface, player jumps
//     if (this.cursor.up.isDown && this.player.body.onFloor() /*|| player.body.onWall()*/ ) {
//       this.player.setVelocityY(-250);
//       //player.anims.play('jump', true);
//     }
//     if (!this.player.body.onFloor()) {
//       this.player.anims.play("jump", true);
//     }
//
//
//   }
//   enemyMovement() {
//     if (this.enemy.x > enemyRight && this.enemy.body.velocity.x > 0) {
//       this.enemy.setVelocityX(-enemySpeed);
//     } else if (this.enemy.x < enemyLeft && this.enemy.body.velocity.x < 0) {
//       this.enemy.setVelocityX(enemySpeed);
//     } else if (this.enemy.body.velocity.x == 0) {
//       this.enemy.setVelocityX(enemySpeed);
//     }
//   }
//   platformMovement(){
//     console.log(this.movingPlatform)
//   }
//   collectDiamond(player, diamond) {
//     diamond.disableBody(true, true);
//     score += 10;
//     this.scoreText.setText("Score: " + score);
//   };
//
//   ExitCreation(){
//     this.ExitDoor = this.physics.add.sprite(760, 450, "player");
//     this.physics.add.collider(this.ExitDoor, this.platform);
//     this.physics.add.overlap(this.ExitDoor, this.player, this.Exit, null, this);
//   }
//   hitEnemy(player, enemy) {
//     if (this.player.y < this.enemy.y - 30) {
//       this.enemy.disableBody(true, true);
//     } else if (player.anims.isPlaying && player.anims.currentAnim.key === "punch" &&
//       ((playerFacingRight && player.x < enemy.x) ||
//         (!playerFacingRight && player.x >= enemy.x))) {
//       this.enemy.disableBody(true, true);
//       player.setVelocityX(0);
//     } else {
//       //if player touches enemy from the side, player loses health
//       playerHealth -= 10;
//       if (playerHealth >= 0) {
//         this.healthLabel.setText("Health: " + playerHealth);
//         //healthBar.setScale(playerHealth/playerMaxHealth, 1);
//       }
//       //move green health bar off screen for player health lost
//       this.healthBar.x -= 2 * (healthLossAmount);
//       // console.log(this.healthBar.x);
//       if (playerHealth <= 0) {
//         console.log("Call gameOver Scene here! Don't pause the physics");
//         this.player.setTint(0xff0000);
//         this.gameOver();
//       }
//       // health.disableBody(true, true);
//       // knockback player on collision with enemy from side and have enemy move away from player
//       if (this.player.x < this.enemy.x) {
//         this.player.x -= knockback;
//         this.enemy.setVelocityX(enemySpeed);
//       } else {
//         this.player.x += knockback;
//         this.enemy.setVelocityX(-enemySpeed);
//       }
//     }
//   }
//   gameOver(){
//     this.physics.pause();
//     this.gameOverState = true;
//     this.gameOverText.visible = true;
//     this.input.on('pointerdown', () => this.scene.start('intro'))
//
//   }
//   Exit(){
//     console.log("collision");
//     this.scene.start('level2')
//   }
//   UpdateItems(){
//     this.items = this.add.sprite(280, 20, "diamond");
//     itemsArr[0] = this.items;
//     itemsArr[0].visible = true;
//   }
// }
//
// export default GameScene;






import { Scene } from "phaser";


let player;
let playerX = 70;
let playerY = 200;
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

class GameScene extends Scene {
  constructor() {
    super('level1')
  }
  preload() {
    //this.load.image("logo", "assets/logo.png");

    this.load.image("background", "Assets/World1.png");
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


  }
  create() {
    const background = this.add.image(0, 0, 'background').setScale(1).setScrollFactor(1);;
    background.setOrigin(0, 0);
    this.createPlatforms();
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
      this.gameOver();
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

    let plat1 = this.platform.create(60, 200, "platform").setAlpha(.5);
    this.platform.create(600, 300, "platform");
    this.platform.create(100, 400, "platform");
    this.platform.create(600, 500, "platform");
    // this.platform.visible = false;
    // this.plat1.setAlpha(.5);
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

export default GameScene;
