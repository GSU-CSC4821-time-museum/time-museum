import { Game } from "phaser";
import GameScene from "./GameScene.js";
import introScreen from "./introScreen.js";
import GameScene2 from "./GameScene2.js";
import EndScreen from "./EndScreen.js"

var config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
  // scene: [introScreen, GameScene, GameScene2, EndScreen],
  scene: [GameScene2, EndScreen],
};

var game = new Phaser.Game(config);