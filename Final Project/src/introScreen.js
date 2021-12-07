import { Scene } from 'phaser'


class introScreen extends Scene {
  constructor(){
    super('intro')
  }
  preload(){
    this.load.image('logo', 'assets/logo.png')
  }
  create(){
    this.add.image(400, 300, 'logo');
    this.input.on('pointerdown', () => this.scene.start('level1'))
  }
}
export default introScreen
