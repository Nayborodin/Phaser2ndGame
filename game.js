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
var tree1;
var tree2;
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
    platforms = this.physics.add.staticGroup();

    for(var x =0; x <= worldWidth; x = x + Phaser.Math.Between(256,500)){
        var y = Phaser.Math.Between(128,810)

        platforms.create(x, y, '14')
        var i
        for(i = 1; i<=Phaser.Math.Between(1,5);i++){
            platforms.create(x + 128 * i, y, '15')
        }

        platforms.create(x + 128 * i, y, '16')
    }
    //створюємо гравця
    //player = this.physics.add.staticGroup();
    player = this.physics.add.sprite(800, 800, 'dude');
    player
    .setBounce(0.2)
    .setCollideWorldBounds(false)
    .setDepth(5);
    //колізія гравця та платформи
    this.physics.add.collider(player, platforms);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    cursors = this.input.keyboard.createCursorKeys();
    stars = this.physics.add.group({
        key: 'star',
        repeat: 111,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    
    //додаємо об'єкти випадковим чином
    tree1 = this.physics.add.staticGroup();
    for (var x = 0; x < worldWidth; x = x + Phaser.Math.FloatBetween(1000,1500))
    {
        var y = Phaser.Math.FloatBetween(100,1000)
        console.log(x, y)
        tree1
        .create(x, 1080 - 128, 'tree1')
        .setOrigin(0, 1)
        .setScale(Phaser.Math.FloatBetween(0.8, 1.5))
        .setDepth(Phaser.Math.Between(1, 10))
        console.log(tree1,X, tree1,Y)
    }
    
}
function update ()
{
    if (gameOver)
    {
        return;
    }

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

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