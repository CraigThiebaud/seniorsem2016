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





    if(vessel === 'fighter'){
        this.fireRate = 550;
        this.health = 3;

        this.ship = game.add.sprite(x, y, 'fighter', 'ship');

        game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.ship.body.immovable = false;
        this.ship.body.collideWorldBounds = true;
        this.ship.body.bounce.setTo(1, 1);


    }
    else if(vessel === 'tank'){
        this.fireRate = 900;
        this.health = 13;

        this.ship = game.add.sprite(x, y, 'tank', 'tanks');


        game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.ship.body.immovable = true;
        this.ship.body.collideWorldBounds = true;
        this.ship.body.bounce.setTo(1, 1);

    }
    else if(vessel === 'carrier'){
        this.fireRate = 1500;
        this.health = 20;

        this.ship = game.add.sprite(x, y, 'carrier', 'ship');



        game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.ship.body.immovable = true;
        this.ship.body.collideWorldBounds = true;
        this.ship.body.bounce.setTo(1, 1);
    }
    else if(vessel === 'drone'){
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

    if(this.ship.key === 'fighter') {

        /*if(this.game.physics.arcade.distanceBetween(this.ship, this.player) > 200) {
            game.physics.arcade.moveToObject(this.ship, this.player, 100);
            this.ship.rotation = anglePlayer;

        }
        else {
            if(this.ship.pivot.x == 0){
                inOrbit++;
            }
            if(!this.alive){
                inOrbit--;
            }

            this.ship.anchor.setTo(0.5, 0.5);
            this.ship.body.offset.setTo(0.5 * this.ship.body.width, 0.5* this.ship.body.length);
            this.ship.pivot.x = 200;


            this.ship.x = this.player.x;
            this.ship.y = this.player.y;
            this.ship.angle += 0.2 * inOrbit;

            if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
                this.nextFire = this.game.time.now + this.fireRate;
                var bullet = this.bullets.getFirstDead();
                bullet.reset(this.ship.body.x, this.ship.body.y);
                bullet.angle = this.ship.angle;
                bullet.roatation = this.game.physics.arcade.moveToObject(bullet, this.player, 500);
            }

        }
        if (this.game.physics.arcade.distanceBetween(this.ship, this.player) < 400) {
            if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
                this.nextFire = this.game.time.now + this.fireRate;

                var bullet = this.bullets.getFirstDead();

                bullet.reset(this.ship.x, this.ship.y);

                bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 500);
            }
        }*/

        if(this.game.physics.arcade.distanceBetween(this.ship, this.player) > 300) {
            game.physics.arcade.moveToObject(this.ship, this.player, 200);
        }

        this.ship.rotation = this.game.physics.arcade.angleBetween(this.ship, this.player);

        if (this.game.physics.arcade.distanceBetween(this.ship, this.player) < 400) {
            if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
                this.nextFire = this.game.time.now + this.fireRate;

                var bullet = this.bullets.getFirstDead();
                bullet.scale.x = 1;
                bullet.scale.y = 1;
                bullet.reset(this.ship.x, this.ship.y);

                bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 500);
            }
        }


    }
    else if(this.ship.key === 'tank') {
        if(this.game.physics.arcade.distanceBetween(this.ship, this.player) > 500) {
            game.physics.arcade.moveToObject(this.ship, this.player, 100);
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
    }
    else if(this.ship.key === 'carrier') {
        if(this.game.physics.arcade.distanceBetween(this.ship, this.player) > 500) {
            game.physics.arcade.moveToObject(this.ship, this.player, 100);
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
        carrierPresent = true;
    }
    else if(this.ship.key === 'drone') {
        if(this.game.physics.arcade.distanceBetween(this.ship, this.player) > 200) {
            game.physics.arcade.moveToObject(this.ship, this.player, 300);
            this.ship.rotation = anglePlayer;

        }
        else {
            if(this.ship.pivot.x == 0){
                inOrbit++;
            }
            if(!this.alive){
                inOrbit--;
            }

            if(inOrbit > 30){
                console.log('here');
            }
            this.ship.anchor.setTo(0.5, 0.5);
            this.ship.body.offset.setTo(0.5 * this.ship.body.width, 0.5* this.ship.body.length);
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
                bullet.roatation = this.game.physics.arcade.moveToObject(bullet, this.player, 500);
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
    game.load.image('drone', 'assets/games/hardpoints/drone.png');
    //game.load.image('logo', 'assets/games/tanks/logo.png');
    game.load.image('bullet', 'assets/games/tanks/bullet.png');
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

var orbit;

var enemies;
var enemyBullets;
var tankShot;
var enemiesAlive = 0;
//var tankCount = 0;
//var fighterCount = 0;
//var carrierCount = 0;
//var droneCount = 0;
//var explosions;
var waveNo = 1;
var wave = {
    "fighters": 15,
    "tanks": 5,
    "carriers": 1,
    "drones": 25,
};
var totalEnemies = wave.fighters + wave.tanks + wave.carriers + wave.drones;
var carrierPresent = false;
var inOrbit = 0;
//var logo;

var currentSpeed = 0;
var cursors;
var shift;

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
    bossMusic = game.add.audio('wakeUp');
    thrusters = game.add.audio('thrusters');
    primaryWeapon = game.add.audio('primaryWeapon');
    explosion = game.add.audio('explosion', 2);

    //

    music.play();

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
    //ship.body.rotation.set;
    ship.angle = 270;
    //  The fighter bullet group
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(100, 'bullet');

    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1.0);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    //tank bullet group

    //carrier bullet group

    //drone bullet group

    //  Create some baddies to waste :)
    enemies = [];

    enemiesAlive = 20;
    var currentTotal;
    for (var i = 0; i < wave["fighters"]; i++) {
        enemies.push(new EnemyShip(i, game, ship, enemyBullets, 'fighter', game.world.randomX, game.world.randomY));
    }
    currentTotal = enemies.length;
    for(var i = currentTotal; i < wave["tanks"] + currentTotal; i++) {
        enemies.push(new EnemyShip(i, game, ship, enemyBullets, 'tank', game.world.randomX, game.world.randomY));
    }
    currentTotal = enemies.length;
    for(var i = currentTotal; i < wave["carriers"] + currentTotal; i++) {
        enemies.push(new EnemyShip(i, game, ship, enemyBullets, 'carrier', game.world.randomX, game.world.randomY));
    }
    currentTotal = enemies.length;
    for(var i = currentTotal; i < wave["drones"] + currentTotal; i++) {
        enemies.push(new EnemyShip(i, game, ship, enemyBullets, 'drone', game.world.randomX, game.world.randomY));
    }


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

    ship.bringToTop();

    //    logo = game.add.sprite(0, 200, 'logo');
    //    logo.fixedToCamera = true;

    //    game.input.onDown.add(removeLogo, this);

    game.camera.follow(ship);
    game.camera.deadzone = new Phaser.Rectangle(900, 400, 100, 200);
    game.camera.focusOnXY(0, 0);
    ship.body.setSize(50, 150);

    cursors = game.input.keyboard.createCursorKeys();
    game.sound.setDecodedCallback([thrusters, primaryWeapon, explosion, music, bossMusic], update, this);

}

function removeLogo() {

    game.input.onDown.remove(removeLogo, this);
    //    logo.kill();

}

function update() {

    game.physics.arcade.overlap(enemyBullets, ship, bulletHitPlayer, null, this);

    enemiesAlive = 0;

    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].alive) {
            enemiesAlive++;
            for(var j = 0; j < enemies.length; j++){
                if(i != j){
                    game.physics.arcade.collide(enemies[i].ship, enemies[j].ship);
                }
            }
            game.physics.arcade.collide(ship, enemies[i].ship);
            game.physics.arcade.overlap(bullets, enemies[i].ship, bulletHitEnemy, null, this);
            enemies[i].update();
        }
        else{

            if(enemies[i].ship.key === 'fighter') {

            }
            else if(enemies[i].ship.key === 'tank') {
            }
            else if(enemies[i].ship.key === 'carrier') {
            }
            else if(enemies[i].ship.key === 'drone') {
            }
        }

    }
    if(enemiesAlive == 0) {
        waveNo++;
        if(waveNo == 2) {
            //TODO: build wave 2
        }
        else if(waveNo == 3) {
            //TODO: build wave 3/intro boss (music change happens here most likely)
            music.stop();
            bossMusic.play();
        }
        else {
            //TODO: GAME OVER SHIT GOES HERE
        }
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        if(currentSpeed >= 300){
            ship.angle -= 600/currentSpeed;
        }
        else {
            ship.angle -= 2;
        }
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        if(currentSpeed >= 300){
            ship.angle += 600/currentSpeed;
        }
        else {
            ship.angle += 2;
        }
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
        if (game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
            if(currentSpeed < 300) {
                currentSpeed += 7;
                //thrusters.play();
                flame.angle = ship.angle - 90;
                flame.x = ship.x;
                flame.y = ship.y;
                flame.anchor.setTo(0.5, 1.45);
                flame.visible = true;
            }
            else if(currentSpeed < 590) {
                currentSpeed += 5;
                //thrusters.play();
                flame.angle = ship.angle - 90;
                flame.x = ship.x;
                flame.y = ship.y;
                flame.anchor.setTo(0.5, 1.6);
                flame.visible = true;
            }
            else {
                currentSpeed = 600;
                //thrusters.play();
                flame.angle = ship.angle - 90;
                flame.x = ship.x;
                flame.y = ship.y;
                flame.anchor.setTo(0.5, 1.7);
                flame.visible = true;
            }
        }
        else {
            if(currentSpeed > 300){
                currentSpeed -= 2;
                flame.angle = ship.angle - 90;
                flame.x = ship.x;
                flame.y = ship.y;
                flame.anchor.setTo(0.5, 1.5);
                flame.visible = true;
            }
            else if(currentSpeed < 290) {
                currentSpeed += 5;
                //thrusters.play();
                flame.angle = ship.angle - 90;
                flame.x = ship.x;
                flame.y = ship.y;
                flame.anchor.setTo(0.5, 1.3);
                flame.visible = true;
            }
            else {
                currentSpeed = 300;
                //thrusters.play();
                flame.angle = ship.angle - 90;
                flame.x = ship.x;
                flame.y = ship.y;
                flame.anchor.setTo(0.5, 1.3);
                flame.visible = true;
            }
        }
    }
    else {
        if (currentSpeed > 0) {
            if(game.input.keyboard.isDown(Phaser.Keyboard.S)) {
                currentSpeed -= 7;
            }
            else {
                currentSpeed -= 2;
            }
        }
        thrusters.stop();
        flame.visible = false;
    }

    if (cursors.left.isDown) {
        game.physics.arcade.velocityFromAngle(ship.angle - 90, 200, ship.body.velocity);
    }
    if(cursors.right.isDown) {
        game.physics.arcade.velocityFromAngle(ship.angle + 90, 200, ship.body.velocity);
    }

    if (currentSpeed > 0) {
        game.physics.arcade.velocityFromAngle(ship.angle, currentSpeed, ship.body.velocity);
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

}

function bulletHitEnemy(ship, bullet) {

    bullet.kill();

    var destroyed = enemies[ship.name].damage();

    if (destroyed) {
        var explosionAnimation = explosions.getFirstExists(false);
        explosionAnimation.reset(0.5* ship.body.width + ship.body.x, 0.5 * ship.body.height + ship.body.y);
        explosionAnimation.play('kaboom', 30, false, true);
        explosion.play();
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
    game.debug.text('Enemies: ' + enemiesAlive + ' / ' + totalEnemies, 32, 32);

}
