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
            debug: true
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
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('crate','assets/Object/Crate.png');
    this.load.image('icebox','assets/Object/IceBox.png');
    this.load.image('stone','assets/Object/Stone.png');
    this.load.image('tree1','assets/Object/Tree_1.png');
    this.load.image('tree2','assets/Object/Tree_2.png');
    this.load.image('igloo','assets/Object/Igloo.png');
    this.load.image('background','assets/background.jpg');
    this.load.image('star','assets/star.png');
    this.load.image('platform','assets/platform.png');
}
function create ()
{
    this.add.tileSprite(0,0,worldWidth, 1080,"background")
    .setOrigin(0,0)
    .setScale(1)
    .setDepth(0);
    platforms = this.physics.add.staticGroup();
    for (var x = 0; 0 < worldWidth; x = x + 128)
    {
        platforms
        .create(x, 1080 - 128,'platform')
        .setOrigin(0,0)
        .refreshBody();
    }
    player = this.physics.add.sprite(800, 800, 'dude');
    player
    .setBounce(0.2)
    .setCollideWorldBounds(false)
    .setDepht(5)
    };

    /*this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });*/

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    cursors = this.input.keyboard.createCursorKeys();
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });
function update ()
{
    if (gameOver)
    {
        return;
    }

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