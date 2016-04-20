
EnemyTank = function (index, game, player, bullets) {

    var x = game.world.randomX;
    var y = game.world.randomY;

    this.game = game;
    this.health = 3;
    this.player = player;
    this.bullets = bullets;
    this.fireRate = 1000;
    this.nextFire = 0;
    this.alive = true;

    this.tank = game.add.sprite(x, y, 'enemy', 'tank1');

    this.tank.anchor.set(0.5);

    this.tank.name = index.toString();
    game.physics.enable(this.tank, Phaser.Physics.ARCADE);
    this.tank.body.immovable = false;
    this.tank.body.collideWorldBounds = true;
    this.tank.body.bounce.setTo(1, 1);

    this.tank.angle = game.rnd.angle();

    game.physics.arcade.velocityFromRotation(this.tank.rotation, 100, this.tank.body.velocity);

};

EnemyTank.prototype.damage = function() {

    this.health -= 1;

    if (this.health <= 0)
    {
        this.alive = false;

        this.tank.kill();

        return true;
    }

    return false;

}

EnemyTank.prototype.update = function() {


    if (this.game.physics.arcade.distanceBetween(this.tank, this.player) < 300)
    {
        if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
        {
            this.nextFire = this.game.time.now + this.fireRate;

            var bullet = this.bullets.getFirstDead();

            //bullet.reset(this.turret.x, this.turret.y);

            bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 500);
        }
    }

};

var game = new Phaser.Game(1900, 1050, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload () {

    //game.load.atlas('enemy', 'assets/games/tanks/enemy-tanks.png', 'assets/games/tanks/tanks.json');
    game.load.image('tank', 'assets/games/tanks/ship.png');
    game.load.image('enemy', 'assets/games/asteroids/ship.png');
    //game.load.image('logo', 'assets/games/tanks/logo.png');
    game.load.image('bullet', 'assets/games/tanks/bullet.png');
    game.load.image('earth', 'assets/games/tanks/scorched_earth.png');
    game.load.spritesheet('kaboom', 'assets/games/tanks/explosion.png', 64, 64, 23);

}

var land;

var tank;

var enemies;
var enemyBullets;
var enemiesTotal = 0;
var enemiesAlive = 0;
var explosions;

//var logo;

var currentSpeed = 0;
var cursors;
var shift;

var bullets;
var fireRate = 100;
var nextFire = 0;

function create () {

    //  Resize our game world to be a 2000 x 2000 square
    game.world.setBounds(-1000, -1000, 5000, 5000);

    //  Our tiled scrolling background
    land = game.add.tileSprite(0, 0, 2000, 2000, 'earth');
    land.fixedToCamera = true;

    //  The base of our tank
    tank = game.add.sprite(50, 50, 'tank', 'ship');
    //tank.scale.x = -1;
    tank.anchor.setTo(0.5, 0.5);

    //  This will force it to decelerate and limit its speed
    game.physics.enable(tank, Phaser.Physics.ARCADE);
    tank.body.drag.set(0.5);
    tank.body.maxVelocity.setTo(600, 600);
    tank.body.collideWorldBounds = true;
    tank.body.rotation.set
    tank.angle = 270;
    //  The enemies bullet group
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(100, 'bullet');

    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 0.5);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    //  Create some baddies to waste :)
    enemies = [];

    enemiesTotal = 20;
    enemiesAlive = 20;

    for (var i = 0; i < enemiesTotal; i++)
    {
        enemies.push(new EnemyTank(i, game, tank, enemyBullets));
    }


    //  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet', 0, false);
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    //  Explosion pool
    explosions = game.add.group();

    for (var i = 0; i < 10; i++)
    {
        var explosionAnimation = explosions.create(0, 0, 'kaboom', [0], false);
        explosionAnimation.anchor.setTo(0.5, 0.5);
        explosionAnimation.animations.add('kaboom');
    }

    tank.bringToTop();

//    logo = game.add.sprite(0, 200, 'logo');
//    logo.fixedToCamera = true;

//    game.input.onDown.add(removeLogo, this);

    game.camera.follow(tank);
    game.camera.deadzone = new Phaser.Rectangle(700, 400, 100, 100);
    game.camera.focusOnXY(0, 0);


    cursors = game.input.keyboard.addKeys( { 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D } );

}

function removeLogo () {

    game.input.onDown.remove(removeLogo, this);
//    logo.kill();

}

function update () {

    game.physics.arcade.overlap(enemyBullets, tank, bulletHitPlayer, null, this);

    enemiesAlive = 0;

    for (var i = 0; i < enemies.length; i++)
    {
        if (enemies[i].alive)
        {
            enemiesAlive++;
            game.physics.arcade.collide(tank, enemies[i].tank);
            game.physics.arcade.overlap(bullets, enemies[i].tank, bulletHitEnemy, null, this);
            enemies[i].update();
        }
    }

    if (cursors.left.isDown)
    {
        tank.angle -= 4;
    }
    else if (cursors.right.isDown)
    {
        tank.angle += 4;
    }

    if (cursors.up.isDown)
    {
        if(cursors.up.shiftKey)
        {
            currentSpeed = 600;
        }
        else
        {
            currentSpeed = 300;
        }
    }
    else
    {
        if (currentSpeed > 0)
        {
            currentSpeed -= 4;
        }
    }

    if (currentSpeed > 0)
    {
        game.physics.arcade.velocityFromRotation(tank.rotation, currentSpeed, tank.body.velocity);
    }

    land.tilePosition.x = -game.camera.x;
    land.tilePosition.y = -game.camera.y;

    //  Position all the parts and align rotations

    if (game.input.activePointer.isDown)
    {
        //  Boom!
        fire();
    }

}

function bulletHitPlayer (tank, bullet) {

    bullet.kill();

}

function bulletHitEnemy (tank, bullet) {

    bullet.kill();

    var destroyed = enemies[tank.name].damage();

    if (destroyed)
    {
        var explosionAnimation = explosions.getFirstExists(false);
        explosionAnimation.reset(tank.x, tank.y);
        explosionAnimation.play('kaboom', 30, false, true);
    }

}

function fire () {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstExists(false);

        //bullet.reset(turret.x, turret.y);

        bullet.rotation = game.physics.arcade.moveToPointer(bullet, 1000, game.input.activePointer, 500);
    }

}

function render () {

    // game.debug.text('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.length, 32, 32);
    game.debug.text('Enemies: ' + enemiesAlive + ' / ' + enemiesTotal, 32, 32);

}
