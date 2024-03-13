var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: game,
    playerSpeed: 1000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config);
var player;
var score=0;
var platforms;
var scoreText;
var gameOver=false;
var worldWidth=config.width*10;
var star;
var cursors;
function preload ()
{
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 90, frameHeight: 90 });
    this.load.image('crate','assets/Object/Crate.png');
    this.load.image('icebox','assets/Object/IceBox.png');
    this.load.image('stone','assets/Object/Stone.png');
    this.load.image('tree1','assets/Object/Tree_1.png');
    this.load.image('tree2','assets/Object/Tree_2.png');
    this.load.image('igloo','assets/Object/Igloo.png');
    this.load.image('background','assets/2.jpg');
    this.load.image('star','assets/star.png');
    this.load.image('platform','assets/platform.png');
    this.load.image('14','assets/Tiles/14.png');
    this.load.image('15','assets/Tiles/15.png');
    this.load.image('16','assets/Tiles/16.png');
    this.load.image('2','assets/Tiles/2.png');
}
function create ()
{
    this.add.image(1000, 540, 'background');
//створюємо платформи
platforms = this.physics.add.staticGroup();
    for (var x = 0; x < worldWidth; x = x + 128)
    {
        console.log(x)
        platforms
        .create(x , 1080 - 128, '2')
        .setOrigin(0,0)
        .refreshBody();
    }
    //платформи в повітрі
    platforms = this.physics.aa.staticGroup();

    for(var x =0; x <= worldWidth; x = x + 128)
    {
        platforms.create(x,1080 - 128, '14').setOrigin(0,0).refreshBody(); 
    }
    //object = this.physics.add.staticGroup();
    //function createWorldObjects(Object, assets)
    
    //for (var x = 0; x <= worldWidth; x = x + Phaser.Math.FloatBetween(256,500))
    
}
function update ()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-playerSpeed);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(playerSpeed);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }

}