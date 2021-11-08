import { Game } from "phaser";
import GameScene from "./GameScene";
import introScreen from "./introScreen.js";
import GameScene2 from "./GameScene2";

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
  // scene: [introScreen, GameScene],
  scene: [GameScene2],
};

var game = new Phaser.Game(config);
