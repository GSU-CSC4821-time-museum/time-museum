import { Game } from "phaser";
import GameScene from "./GameScene.js";
import introScreen from "./introScreen.js";
import GameScene2 from "./GameScene2.js";

var config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [introScreen, GameScene, GameScene2],
  // scene: [introScreen, GameScene],
};

var game = new Phaser.Game(config);
