EnemyShip = function(index, game, player, bullets, shipClass, argX, argY) {

    var x = argX;
    var y = argY;
    var vessel = shipClass;
    var inorbit = 'bleep';
    this.game = game;
    this.player = player;
    this.bullets = bullets;

    this.nextFire = 0;
    this.alive = true;





    if (vessel === 'fighter') {
        this.fireRate = 800;
        this.health = 2;

        this.ship = game.add.sprite(x, y, 'fighter', 'ship');

        game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.ship.scale.x = 0.8;
        this.ship.scale.y = 0.8;
        this.ship.body.immovable = false;
        this.ship.body.collideWorldBounds = true;
        this.ship.body.bounce.setTo(1, 1);
        this.ship.body.setSize(this.ship.width - 50, this.ship.height - 50);

    } else if (vessel === 'tank') {
        this.fireRate = 1500;
        this.health = 8;

        this.ship = game.add.sprite(x, y, 'tank', 'tanks');


        game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.ship.body.immovable = true;
        this.ship.body.collideWorldBounds = true;
        this.ship.body.bounce.setTo(1, 1);
        this.ship.body.setSize(this.ship.width - 50, this.ship.height - 50);

    } else if (vessel === 'carrier') {
        this.fireRate = 1700;
        this.health = 20;

        this.ship = game.add.sprite(x, y, 'carrier', 'ship');



        game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.ship.body.immovable = true;
        this.ship.body.collideWorldBounds = true;
        this.ship.body.bounce.setTo(1, 1);
    } else if (vessel === 'drone') {
        this.fireRate = 500;
        this.health = 1;

        this.ship = game.add.sprite(x, y, 'drone', 'ship');
        this.ship.scale.x = 0.5;
        this.ship.scale.y = 0.5;

        game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.ship.body.immovable = false;
        this.ship.body.collideWorldBounds = true;
        this.ship.body.bounce.setTo(1, 1);
        this.ship.body.setSize(this.ship.width, this.ship.height);
    } else if (vessel === 'boss') {
        this.fireRate = 700;
        this.health = 70;

        this.ship = game.add.sprite(x, y, 'boss', 'ship');
        this.ship.scale.x = 1.5;
        this.ship.scale.y = 1.5;

        game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.ship.body.immovable = false;
        this.ship.body.collideWorldBounds = true;
        this.ship.body.bounce.setTo(1, 1);
        this.ship.body.setSize(this.ship.width - 400, this.ship.height - 400);
    } else if (vessel === 'bc1') {
        this.fireRate = 300;
        this.ship = game.add.sprite(x, y, 'bc1', 'ship');

        game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.ship.body.immovable = false;
        this.ship.body.collideWorldBounds = true;
        //this.ship.body.bounce.setTo(1, 1);
        this.ship.body.setSize(this.ship.width, this.ship.height);
        this.ship.visible = false;
    } else if (vessel === 'bc2') {
        this.fireRate = 300;
        this.ship = game.add.sprite(x, y, 'bc2', 'ship');

        game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.ship.body.immovable = false;
        this.ship.body.collideWorldBounds = true;
        //this.ship.body.bounce.setTo(1, 1);
        this.ship.body.setSize(this.ship.width, this.ship.height);
        this.ship.visible = false;
    } else if (vessel === 'bc3') {
        this.fireRate = 300;
        this.ship = game.add.sprite(x, y, 'bc3', 'ship');

        game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.ship.body.immovable = false;
        this.ship.body.collideWorldBounds = true;
        //this.ship.body.bounce.setTo(1, 1);
        this.ship.body.setSize(this.ship.width, this.ship.height);
        this.ship.visible = false;
    } else if (vessel === 'bc4') {
        this.fireRate = 300;
        this.ship = game.add.sprite(x, y, 'bc4', 'ship');

        game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.ship.body.immovable = false;
        this.ship.body.collideWorldBounds = true;
        //this.ship.body.bounce.setTo(1, 1);
        this.ship.body.setSize(this.ship.width, this.ship.height);
        this.ship.visible = false;
    }
    this.ship.name = index.toString();


    this.ship.anchor.set(0.5);



    this.ship.angle = game.rnd.angle();


    //game.physics.arcade.velocityFromRotation(this.ship.rotation, 100, this.ship.body.velocity);

};

EnemyShip.prototype.damage = function() {

    this.health -= 1;

    if (this.health <= 0) {
        this.alive = false;

        this.ship.kill();

        return true;
    }

    return false;

}

EnemyShip.prototype.update = function() {
    var anglePlayer = this.game.physics.arcade.angleBetween(this.ship, this.player);

    if (this.ship.key === 'fighter') {
        var moveSpeed = this.ship.body.speed;
        if (this.game.physics.arcade.distanceBetween(this.ship, this.player) > 400) {
            game.physics.arcade.moveToObject(this.ship, this.player, 350);
        } else {
            moveSpeed -= 10;
            this.ship.velocity = this.game.physics.arcade.velocityFromAngle(this.ship.angle, moveSpeed, this.ship.body.velocity);
        }

        this.ship.rotation = this.game.physics.arcade.angleBetween(this.ship, this.player);

        if (this.game.physics.arcade.distanceBetween(this.ship, this.player) < 500) {
            if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
                this.nextFire = this.game.time.now + this.fireRate;

                var bullet = this.bullets.getFirstDead();
                bullet.scale.x = 1;
                bullet.scale.y = 1;
                bullet.reset(this.ship.x, this.ship.y);

                bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 500);
            }
        }


    } else if (this.ship.key === 'tank') {

        var moveSpeed = this.ship.body.speed;
        if (this.game.physics.arcade.distanceBetween(this.ship, this.player) > 500) {
            game.physics.arcade.moveToObject(this.ship, this.player, 250);
        } else {
            moveSpeed -= 5;
            this.ship.velocity = this.game.physics.arcade.velocityFromAngle(this.ship.angle, moveSpeed, this.ship.body.velocity);
        }

        this.ship.rotation = this.game.physics.arcade.angleBetween(this.ship, this.player);

        if (this.game.physics.arcade.distanceBetween(this.ship, this.player) < 600) {
            if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
                this.nextFire = this.game.time.now + this.fireRate;

                var bullet = this.bullets.getFirstDead();
                bullet.scale.x = 2.0;
                bullet.scale.y = 2.0;
                bullet.reset(this.ship.x, this.ship.y);

                bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 500);
            }
        }
    } else if (this.ship.key === 'carrier') {
        if (this.game.physics.arcade.distanceBetween(this.ship, this.player) > 550) {
            game.physics.arcade.moveToObject(this.ship, this.player, 100);
        } else {
            moveSpeed -= 2;

            this.ship.velocity = this.game.physics.arcade.velocityFromAngle(this.ship.angle, moveSpeed, this.ship.body.velocity);
        }

        this.ship.rotation = this.game.physics.arcade.angleBetween(this.ship, this.player);

        if (this.game.physics.arcade.distanceBetween(this.ship, this.player) < 600) {
            if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
                this.nextFire = this.game.time.now + this.fireRate;

                var bullet = this.bullets.getFirstDead();
                bullet.scale.x = 2.0;
                bullet.scale.y = 2.0;
                bullet.reset(this.ship.x, this.ship.y);

                bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 500);
            }
        }
        if (this.ship.alive) {
            carrierPresent = true;
        } else {
            carrierPresent = false;
        }
    } else if (this.ship.key === 'drone') {
        if (this.game.physics.arcade.distanceBetween(this.ship, this.player) > 200) {
            game.physics.arcade.moveToObject(this.ship, this.player, 300);
            this.ship.rotation = anglePlayer;

        } else {
            if (this.ship.pivot.x == 0) {
                inOrbit++;
            }
            if (!this.alive) {
                inOrbit--;
            }

            if (inOrbit > 30) {
                console.log('here');
            }
            this.ship.anchor.setTo(0.5, 0.5);
            this.ship.body.offset.setTo(0.5 * this.ship.body.width, 0.5 * this.ship.body.length);
            this.ship.pivot.x = 400;


            this.ship.x = this.player.x;
            this.ship.y = this.player.y;
            this.ship.angle += 0.2 * inOrbit;

            if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
                var tempFire = this.fireRate - (inOrbit * 5);
                this.nextFire = this.game.time.now + tempFire;
                var bullet = this.bullets.getFirstDead();
                bullet.scale.x = 0.5;
                bullet.scale.y = 0.5;
                bullet.reset(this.ship.body.x, this.ship.body.y);
                bullet.angle = this.ship.angle;
                bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 500);
            }

        }
        if (this.game.physics.arcade.distanceBetween(this.ship, this.player) < 400) {
            if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
                this.nextFire = this.game.time.now + this.fireRate;

                var bullet = this.bullets.getFirstDead();
                bullet.scale.x = 0.5;
                bullet.scale.y = 0.5;

                bullet.reset(this.ship.x, this.ship.y);

                bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 500);
            }
        }
    } else if (this.ship.key === 'boss') {
        if (this.game.physics.arcade.distanceBetween(this.ship, this.player) > 550) {
            game.physics.arcade.moveToObject(this.ship, this.player, 100);
        } else {
            this.ship.body.velocity.setTo(0, 0);
        }

        this.ship.angle += 1;


        /*if (this.game.physics.arcade.distanceBetween(this.ship, this.player) < 600) {
            if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
                this.nextFire = this.game.time.now + this.fireRate;

                var bullet = this.bullets.getFirstDead();
                bullet.scale.x = 2.0;
                bullet.scale.y = 2.0;
                bullet.reset(this.ship.x, this.ship.y);

                bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 500);
            }
        }*/
        if (this.ship.alive) {
            carrierPresent = true;
        } else {
            carrierPresent = false;
        }
    } else if (this.ship.key === 'bc1') {
        var shipX, shipY;
        for (var i = 0; i < enemies.length; i++) {
            var x = enemies[i];
            if (x.ship.key === 'boss') {
                shipX = 0.5 * x.ship.body.width;
                shipY = 1 * x.ship.body.length;
                this.ship.anchor.setTo(-0.1, -0.1);
                this.ship.body.offset.setTo(shipX, shipY);
                this.ship.pivot.x = 230;
                this.ship.x = x.ship.x;
                this.ship.y = x.ship.y;
                this.ship.angle = x.ship.angle;
            }
        }

        if (this.alive) {
            if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
                this.nextFire = this.game.time.now + this.fireRate;

                var bullet = this.bullets.getFirstDead();
                //bullet.anchor.setTo(-0.1, -0.1)
                bullet.scale.x = 1.0;
                bullet.scale.y = 1.0;
                bullet.pivot.x = 230;
                bullet.reset(this.ship.x, this.ship.y);
                //bullet.anchor.setTo(-0.1, -0.1);
                //bullet.body.offset.setTo(shipX, shipY);
                bullet.angle = this.ship.angle;
                this.game.physics.arcade.velocityFromAngle(this.ship.angle + 225, 400, bullet.body.velocity);
            }
        }

    } else if (this.ship.key === 'bc2') {
        var shipX, shipY;
        for (var i = 0; i < enemies.length; i++) {
            var x = enemies[i];
            if (x.ship.key === 'boss') {
                shipX = 0.5 * x.ship.body.width;
                shipY = 1 * x.ship.body.length;
                this.ship.anchor.setTo(-0.5, 0.4);
                this.ship.body.offset.setTo(shipX, shipY);
                this.ship.pivot.x = 230;
                this.ship.x = x.ship.x;
                this.ship.y = x.ship.y;
                this.ship.angle = x.ship.angle + 90;
            }
        }
        if (this.alive) {
            if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
                this.nextFire = this.game.time.now + this.fireRate;

                var bullet = this.bullets.getFirstDead();
                //bullet.anchor.setTo(-0.5, 0.4)
                bullet.scale.x = 1.0;
                bullet.scale.y = 1.0;
                bullet.pivot.x = 225;
                bullet.reset(this.ship.x, this.ship.y);
                //bullet.anchor.setTo(-0.1, -0.1);
                //bullet.body.offset.setTo(shipX, shipY);
                bullet.angle = this.ship.angle;
                this.game.physics.arcade.velocityFromAngle(this.ship.angle + 225, 400, bullet.body.velocity);
            }
        }

    } else if (this.ship.key === 'bc3') {
        var shipX, shipY;
        for (var i = 0; i < enemies.length; i++) {
            var x = enemies[i];
            if (x.ship.key === 'boss') {
                shipX = 0.5 * x.ship.body.width;
                shipY = 1 * x.ship.body.length;
                this.ship.anchor.setTo(-0.1, 1.0);
                this.ship.body.offset.setTo(shipX, shipY);
                this.ship.pivot.x = 230;
                this.ship.x = x.ship.x;
                this.ship.y = x.ship.y;
                this.ship.angle = x.ship.angle + 180;
            }
        }

        if (this.alive) {
            if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
                this.nextFire = this.game.time.now + this.fireRate;

                var bullet = this.bullets.getFirstDead();
                //bullet.anchor.setTo(-0.1, 1.0)
                bullet.scale.x = 1.0;
                bullet.scale.y = 1.0;
                bullet.pivot.x = 225;
                bullet.reset(this.ship.x, this.ship.y);
                //bullet.anchor.setTo(-0.1, -0.1);
                //bullet.body.offset.setTo(shipX, shipY);
                bullet.angle = this.ship.angle;
                this.game.physics.arcade.velocityFromAngle(this.ship.angle + 225, 400, bullet.body.velocity);
            }
        }
    } else if (this.ship.key === 'bc4') {
        var shipX, shipY;
        for (var i = 0; i < enemies.length; i++) {
            var x = enemies[i];
            if (x.ship.key === 'boss') {
                shipX = 0.5 * x.ship.body.width;
                shipY = 1 * x.ship.body.length;
                this.ship.anchor.setTo(0.6, 0.75);
                this.ship.body.offset.setTo(shipX, shipY);
                this.ship.pivot.x = 230;
                this.ship.x = x.ship.x;
                this.ship.y = x.ship.y;
                this.ship.angle = x.ship.angle + 270;
            }
        }

        if (this.alive) {
            if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
                this.nextFire = this.game.time.now + this.fireRate;

                var bullet = this.bullets.getFirstDead();
                //bullet.anchor.setTo(0.6, 0.75)
                bullet.scale.x = 1.0;
                bullet.scale.y = 1.0;
                bullet.pivot.x = 225;
                bullet.reset(this.ship.x, this.ship.y);
                //bullet.anchor.setTo(-0.1, -0.1);
                //bullet.body.offset.setTo(shipX, shipY);
                bullet.angle = this.ship.angle;
                this.game.physics.arcade.velocityFromAngle(this.ship.angle + 225, 400, bullet.body.velocity);
            }
        }
    }
};

var game = new Phaser.Game(1900, 1050, Phaser.AUTO, 'phaser-example', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {

    //game.load.atlas('enemy', 'assets/games/tanks/enemy-tanks.png', 'assets/games/tanks/tanks.json');
    game.load.image('ship', 'assets/games/hardpoints/ship.png');
    game.load.image('fighter', 'assets/games/hardpoints/fighter.png');
    game.load.image('tank', 'assets/games/hardpoints/tank.png');
    game.load.image('carrier', 'assets/games/hardpoints/carrier.png');
    game.load.image('drone', 'assets/games/hardpoints/drone2.png');
    game.load.image('boss', 'assets/games/hardpoints/boss.png');
    game.load.image('splash', 'assets/games/hardpoints/splash.png');
    game.load.image('bullet', 'assets/games/tanks/bullet.png');
    game.load.image('bossBullet', 'assets/sprites/orb-red.png');
    game.load.image('bc1', 'assets/sprites/orb-red.png');
    game.load.image('bc2', 'assets/sprites/orb-red.png');
    game.load.image('bc3', 'assets/sprites/orb-red.png');
    game.load.image('bc4', 'assets/sprites/orb-red.png');
    game.load.image('earth', 'assets/skies/deep-space.jpg');
    game.load.spritesheet('kaboom', 'assets/games/tanks/explosion.png', 64, 64, 23);
    game.load.image('flame', 'assets/misc/bullet1.png');

    //music
    game.load.audio('kashmir', 'assets/audio/kashmir.mp3');
    game.load.audio('wakeUp', 'assets/audio/wakeUp.mp3');

    //sound effects
    game.load.audio('thrusters', 'assets/audio/SoundEffects/rockets.mp3');
    game.load.audio('primaryWeapon', 'assets/audio/SoundEffects/blaster.mp3');
    game.load.audio('explosion', 'assets/audio/SoundEffects/explosion.mp3');
}

var land;

var ship;
var flame;
var bossCannon;
var orbit;



var enemies = [];
var enemyBullets;
var tankShot;
var enemiesAlive = 0;
//var tankCount = 0;
//var fighterCount = 0;
//var carrierCount = 0;
//var droneCount = 0;
//var explosions;
var waveNo = -1;
var wave = {
    "fighters": 0,
    "tanks": 0,
    "carriers": 0,
    "boss": 0,
};
var totalEnemies = wave.fighters + wave.tanks + wave.carriers + wave.drones;
var carrierPresent = false;
var inOrbit = 0;
var splash;

var playerDead = true;
var currentTime;
var currentSpeed = 0;
var cursors;
var shift;
//var deathTime = 3000;
var spawnRate = 400;
var spawnCheck = 400;
var spawnCap = 1;
var spawnCoefficient = 1;
var bossCannon;
var bullets;
var fireRate = 100;
var nextFire = 0;
var bossMusic;
var thrusters;
var music;
var primaryWeapon;
var explosion;

function create() {

    //  Resize our game world to be a 2000 x 2000 square
    game.world.setBounds(-1000, -1000, 5000, 5000);

    //  Our tiled scrolling background
    land = game.add.tileSprite(0, 0, 2000, 2000, 'earth');
    land.fixedToCamera = true;

    music = game.add.audio('kashmir', 5);
    bossMusic = game.add.audio('wakeUp', 5);
    thrusters = game.add.audio('thrusters');
    primaryWeapon = game.add.audio('primaryWeapon');
    explosion = game.add.audio('explosion', 2);

    //

    //game.load.bitmapFont('gem', 'assets/fonts/bitmapFonts/gem.png', 'assets/fonts/bitmapFonts/gem.xml');

    //  The fighter bullet group
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(100, 'bullet');

    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1.0);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    bossBullets = game.add.group();
    bossBullets.enableBody = true;
    bossBullets.physicsBodyType = Phaser.Physics.ARCADE;
    bossBullets.createMultiple(100, 'bossBullet');

    bossBullets.setAll('anchor.x', 0.5);
    bossBullets.setAll('anchor.y', 1.0);
    bossBullets.setAll('outOfBoundsKill', true);
    bossBullets.setAll('checkWorldBounds', true);


    //tank bullet group

    //carrier bullet group

    //drone bullet group

    //  Create some baddies to waste :)




    //  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet', 0, false);
    //bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    //  Explosion pool
    explosions = game.add.group();

    for (var i = 0; i < 10; i++) {
        var explosionAnimation = explosions.create(0, 0, 'kaboom', [0], false);
        explosionAnimation.anchor.setTo(0.5, 0.5);
        explosionAnimation.animations.add('kaboom');
    }






    cursors = game.input.keyboard.createCursorKeys();
    game.sound.setDecodedCallback([thrusters, primaryWeapon, explosion, music, bossMusic], update, this);

}

function removeSplash() {

    game.input.onDown.remove(removeSplash, this);
    splash.kill();
    enemiesAlive++;
}

function droneSpawn(carrier) {
    currentTotal = enemies.length;
    for (var i = currentTotal; i < spawnCap + currentTotal; i++) {
        enemies.push(new EnemyShip(i, game, ship, enemyBullets, 'drone', carrier.ship.x, carrier.ship.y));
    }
}



function update() {
    //currentTime = currentTime > 0
    game.physics.arcade.overlap(enemyBullets, ship, bulletHitPlayer, null, this);
    game.physics.arcade.overlap(bossBullets, ship, bulletHitPlayer, null, this);

    spawnCoefficient = enemiesAlive <= 30 ? 30 / enemiesAlive : 1;

    enemiesAlive = enemiesAlive == -1 ? -1 : 0;

    if (carrierPresent == true) {
        if (spawnRate <= spawnCheck) {
            for (var i = 0; i < enemies.length; i++) {
                if (enemies[i].ship.key === 'carrier' || enemies[i].ship.key === 'boss') {
                    droneSpawn(enemies[i]);
                }
            }
            spawnCheck = 0;
        }
        spawnCheck += spawnCoefficient;
        /*if(enemies[i].ship.key === 'carrier'){
            spawnCheck += spawnCoefficient;
        }
        else{
            spawnCheck += 20;
        }*/
    }

    if (!playerDead) {
        for (var i = 0; i < enemies.length; i++) {
            if (enemies[i].alive) {
                enemiesAlive++;
                for (var j = 0; j < enemies.length; j++) {
                    if (i != j) {
                        game.physics.arcade.collide(enemies[i].ship, enemies[j].ship);
                    }
                }
                game.physics.arcade.collide(ship, enemies[i].ship);
                game.physics.arcade.overlap(bullets, enemies[i].ship, bulletHitEnemy, null, this);
                enemies[i].update();
                if (enemies[i].ship.key === 'boss') {
                    bc1.update();
                    bc2.update();
                    bc3.update();
                    bc4.update();
                }
            }
        }
    }
    if (enemiesAlive == 0) {
        if (waveNo < 4) {
            waveNo++;
        } else {
            waveNo = 0;
        }
        if (waveNo == 0) {
            //    if(this.game.time.now == currentTime + deathTime){
            enemiesAlive = -1;
            splash = game.add.sprite(0, 200, 'splash');
            splash.fixedToCamera = true;
            splash.cameraOffset.setTo(685, 200)
            game.input.onDown.add(removeSplash, this);
            bossMusic.stop();
            music.play();
            if (playerDead) {
                //  The base of our ship
                ship = game.add.sprite(50, 50, 'ship', 'ship');
                //ship.scale.x = -1;
                ship.anchor.setTo(0.5, 0.5);

                flame = game.add.sprite(ship.x, ship.y, 'flame', 'flame');
                flame.visible = false;


                //  This will force it to decelerate and limit its speed
                game.physics.enable(ship, Phaser.Physics.ARCADE);
                ship.body.drag.set(0.5);
                ship.body.maxVelocity.setTo(600, 600);
                ship.body.collideWorldBounds = true;
                ship.health = 50;
                //ship.body.rotation.set;
                ship.angle = 270;
                ship.bringToTop();


                game.camera.follow(ship);
                game.camera.deadzone = new Phaser.Rectangle(900, 400, 100, 200);
                game.camera.focusOnXY(0, 0);
                ship.body.setSize(50, 150);
                playerDead = false;
            }
            ship.health = 50;

        }
        //    else{
        //        waveNo = 4;
        //    }
        //}
        if (waveNo == 1) {
            enemies = [];
            wave = {
                "fighters": 10,
                "tanks": 3,
                "carriers": 0,
                "boss": 0,
            };
            enemySpawn();
        }
        if (waveNo == 2) {
            enemies = [];
            wave = {
                "fighters": 10,
                "tanks": 3,
                "carriers": 1,
                "boss": 0,
            };
            enemySpawn();

        } else if (waveNo == 3) {
            enemies = [];
            wave = {
                "fighters": 0,
                "tanks": 0,
                "carriers": 0,
                "boss": 1,
            };
            enemySpawn();
            music.stop();
            bossMusic.play();
        }
        //else{
        //    currentTime = game.time.now;
        //}
    }

    if (cursors.left.isDown) {
        if (currentSpeed >= 300) {
            ship.angle -= 1200 / currentSpeed;
        } else {
            ship.angle -= 4;
        }
    } else if (cursors.right.isDown) {
        if (currentSpeed >= 300) {
            ship.angle += 1200 / currentSpeed;
        } else {
            ship.angle += 4;
        }
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
        if (game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {

            if (currentSpeed < 300) {
                currentSpeed += 7;
            } else if (currentSpeed < 590) {
                currentSpeed += 5;
            } else {
                currentSpeed = 600;
            }
        } else {
            if (currentSpeed > 300) {
                currentSpeed -= 2;
            } else if (currentSpeed < 290) {
                currentSpeed += 5;
                //thrusters.play();
            } else {
                currentSpeed = 300;
            }
        }
    } else {
        if (currentSpeed > 0) {
            if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
                currentSpeed -= 7;
            } else {
                currentSpeed -= 2;
            }
        }
    }
    if (!playerDead) {
        flame.visible = currentSpeed > 0;
        if (flame.visible) {
            var flameSize = currentSpeed / 400 - 0.2 * Math.random();
            flame.anchor.setTo(0.5, 1.1 + 0.5 * flameSize);
            flame.angle = ship.angle - 90;
            flame.x = ship.x;
            flame.y = ship.y;
        }


        if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
            var strafeSpeed = currentSpeed > 375 ? currentSpeed / 75 : currentSpeed / 20;
            if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                game.physics.arcade.velocityFromAngle(ship.angle - 13500 / currentSpeed, currentSpeed + strafeSpeed, ship.body.velocity);
            } else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
                game.physics.arcade.velocityFromAngle(ship.angle + 13500 / currentSpeed, currentSpeed + strafeSpeed, ship.body.velocity);
            } else {
                game.physics.arcade.velocityFromAngle(ship.angle, currentSpeed, ship.body.velocity);
            }
        } else {
            if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                game.physics.arcade.velocityFromAngle(ship.angle - 90, 355, ship.body.velocity);
            } else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
                game.physics.arcade.velocityFromAngle(ship.angle + 90, 355, ship.body.velocity);
            } else {
                game.physics.arcade.velocityFromAngle(ship.angle, currentSpeed, ship.body.velocity);
            }
        }
    }
    land.tilePosition.x = -game.camera.x;
    land.tilePosition.y = -game.camera.y;

    //  Position all the parts and align rotations

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        //  Boom!
        fire();
    }



}

function bulletHitPlayer(ship, bullet) {

    bullet.kill();

    if(waveNo != 0){
    ship.health -= 1;
}
    var destroyed = ship.health <= 0;



    if (destroyed) {
        ship.alive = false;
        ship.kill();
        //flame.kill()
        flame.visible = false;
        var explosionAnimation = explosions.getFirstExists(false);
        explosionAnimation.reset(0.5 * ship.body.width + ship.body.x, 0.5 * ship.body.height + ship.body.y);
        explosionAnimation.play('kaboom', 30, false, true);
        explosion.play();
        boardWipe();
        playerDead = true;
        //        currentTime = this.game.time.now;

    }


}

function enemySpawn() {
    var currentTotal = 0;
    for (var i = 0; i < wave["fighters"]; i++) {
        enemies.push(new EnemyShip(i, game, ship, enemyBullets, 'fighter', game.world.randomX, game.world.randomY));
    }
    currentTotal = enemies.length;
    for (var i = currentTotal; i < wave["tanks"] + currentTotal; i++) {
        enemies.push(new EnemyShip(i, game, ship, enemyBullets, 'tank', game.world.randomX, game.world.randomY));
    }
    currentTotal = enemies.length;
    for (var i = currentTotal; i < wave["carriers"] + currentTotal; i++) {
        enemies.push(new EnemyShip(i, game, ship, enemyBullets, 'carrier', game.world.randomX, game.world.randomY));
    }
    currentTotal = enemies.length;
    for (var i = currentTotal; i < wave["boss"] + currentTotal; i++) {
        var x = game.world.randomX;
        var y = game.world.randomY;
        enemies.push(new EnemyShip(i, game, ship, enemyBullets, 'boss', x, y));
        bc1 = (new EnemyShip(i + 1, game, ship, bossBullets, 'bc1', x, y));
        bc2 = (new EnemyShip(i + 2, game, ship, bossBullets, 'bc2', x, y));
        bc3 = (new EnemyShip(i + 3, game, ship, bossBullets, 'bc3', x, y));
        bc4 = (new EnemyShip(i + 4, game, ship, bossBullets, 'bc4', x, y));
    }
}

function bulletHitEnemy(ship, bullet) {

    bullet.kill();

    var destroyed = enemies[ship.name].damage();

    if (destroyed && ship.key != 'bc1' && ship.key != 'bc2' && ship.key != 'bc3' && ship.key != 'bc4') {
        var explosionAnimation = explosions.getFirstExists(false);
        explosionAnimation.reset(0.5 * ship.body.width + ship.body.x, 0.5 * ship.body.height + ship.body.y);
        explosionAnimation.play('kaboom', 30, false, true);
        explosion.play();
        if (ship.key === 'boss') {
            bc1.alive = false;
            bc2.alive = false;
            bc3.alive = false;
            bc4.alive = false;
        }
    }

}

function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0) {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstExists(false);

        bullet.reset(ship.x, ship.y);
        bullet.rotation = ship.rotation;
        bullet.angle = ship.angle;
        game.physics.arcade.velocityFromAngle(ship.angle, 1500, bullet.body.velocity);
        primaryWeapon.play();
    }

}

function render() {

    //game.debug.text('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.length, 32, 32);
    if (!playerDead) {
        game.debug.text('Health: ' + ship.health, 32, 32);
    }
    //    if(!playerDead){
    //    game.add.bitmapText(32, 128, 'gem', "Health: " + ship.health, 32);
    //}

}

function boardWipe() {
    for (i = 0; i < enemies.length; i++) {

        enemies[i].alive = false;

        enemies[i].ship.kill();

    }
    enemies = [];
    waveNo = 4;

}
