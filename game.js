var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: game,
    playerSpeed: 1500,
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
var worldWidth = config.width * 10
var game = new Phaser.Game(config);
var lifeText
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
var tnt;
var defuse;
function preload ()
{
    this.load.sprite
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('crate','assets/Object/Crate.png');
    this.load.image('icebox','assets/Object/IceBox.png');
    this.load.image('stone','assets/Object/Stone.png');
    this.load.image('tree1','assets/Object/Tree_1.png');
    this.load.image('tree2','assets/Object/Tree_2.png');
    this.load.image('igloo','assets/Object/Igloo.png');
    this.load.image('bg','assets/2.jpg');
    this.load.image('star','assets/star.png');
    this.load.image('platform','assets/platform.png');
    this.load.image('14','assets/Tiles/14.png');
    this.load.image('15','assets/Tiles/15.png');
    this.load.image('16','assets/Tiles/16.png');
    this.load.image('2','assets/Tiles/2.png');
}
function create ()
{
    //встановив фон
    this.add.tileSprite(0, 0, worldWidth, 1080, "bg")
        .setOrigin(0, 0)
        .setScale(1.5)
        .setDepth(0);
//створюємо платформи
platforms = this.physics.add.staticGroup();

    for (var x = 0; x <= worldWidth; x = x + 128)
    {        platforms
        .create(x , 1080 - 128, '2')
        .setOrigin(0,0)
        .refreshBody();
    }

    objects = this.physics.add.staticGroup();

    function createWorldObjects(objects, asset) {
        for (var x = 0; x <= worldWidth; x = x + Phaser.Math.FloatBetween(500, 900)) {

            objects
                .create(x, 1080 - 128, asset)
                .setOrigin(0, 1)
                .setScale(Phaser.Math.FloatBetween(0.8, 1.5,))
                .setDepth(Phaser.Math.Between(1, 10))

        }
    }
    this.physics.add.collider(platforms, objects);
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
    player = this.physics.add.staticGroup();
    player = this.physics.add.sprite(800, 800, 'dude');
    player.setCollideWorldBounds(true);
    player
    .setBounce(0.2)
    .setCollideWorldBounds(true)
    .setDepth(5);

    cursors = this.input.keyboard.createCursorKeys();
    
    this.physics.add.collider(player, platforms);

    this.cameras.main.setBounds(0, 0, worldWidth, 1080);
    this.physics.world.setBounds(0, 0, worldWidth, 1080);
    this.cameras.main.startFollow(player);

    stone = this.physics.add.staticGroup();
    tree1 = this.physics.add.staticGroup();

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
        repeat: 100,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    //додаємо об'єкти випадковим чином
    tree1 = this.physics.add.staticGroup();
    for (var x = 0; x < worldWidth; x = x + Phaser.Math.FloatBetween(1000,1500))
    {
        var y = Phaser.Math.FloatBetween(100,1000)
        tree1
        .create(x, 1080 - 128, 'tree1')
        .setOrigin(0, 1)
        .setScale(Phaser.Math.FloatBetween(0.5, 1))
        .setDepth(Phaser.Math.Between(1, 10))

    }
    for (var x = 0; x < worldWidth; x = x + Phaser.Math.FloatBetween(600, 1000)) {

        stone
            .create(x, 1080 - 128, 'stone')
            .setOrigin(0, 1)
            .setScale(Phaser.Math.FloatBetween(3, 1.5, 0.2))
            .setDepth(Phaser.Math.Between(1, 10));
    }
    //рахунок
    scoreText = this.add.text(100, 100, 'Score: 0', { fontSize: '20px', fill: '#FFF' })

    lifeText = this.add.text(1500, 100, showLife(), { fontSize: '40px',fill: '#FFF' })
}
function update ()
{
    

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
    else if (cursors.up.isDown)
    {
        player.setVelocityY(2000)

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
function collectStar(player, star) {
    star.disableBody(true, true);

    var bomb = bombs.create(20, 20, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    Score += 1;
    ScoreText.setText('Stars: ' + Score);

    if (Score == 138) {

        this.physics.pause();


        this.add.text(760, 540, 'Your game time: ' + timeElapsed, { fontSize: '50px', fill: '#0000FF' }).setScrollFactor(0);
        this.add.text(660, 490, 'For restart press: ENTER', { fontSize: '50px', fill: '#0000FF' }).setScrollFactor(0);

        //Reload canvas
        document.addEventListener('keyup', function (event) {
            if (event.code === 'Enter') {
                window.location.reload();
            }
        });

    }
}
function showLife() {
    var lifeLine = ''

    for (i = 0; i < lifeLine; i++) {
        lifeLine = lifeLine + '❤'
    }

    return lifeLine
}

