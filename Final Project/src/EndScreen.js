import { Scene } from 'phaser'


class EndScreen extends Scene {
  constructor(){
    super('End')
  }
  preload(){
    this.load.image('logo', 'assets/logo.png')
  }
  create(){
    this.add.image(400, 300, 'logo');
    var text = this.add.text(300,350, '                        ');

    text.setInteractive({ useHandCursor: true });
    text.on('pointerdown', () => this.scene.start('level1'));
  }
}
export default EndScreen