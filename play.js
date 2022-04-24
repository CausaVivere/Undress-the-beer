import Phaser from "phaser";
import game from "./menu";
import Menu from "./menu";

export default class Play extends Phaser.Scene{


    constructor(){
        super({ key: 'Play' });
        this.state = {};
        };
    
    init(info){
        this.mode = info[0];
        this.difficulty = info[1];
        this.sfxClick = info[2];
        this.musicClick = info[3];
        this.scene.stop('Menu');

        this.score = 0;
    
        console.log(this.sfxClick, this.musicClick);
    };
    
    preload(){
        //load images
        if(this.mode == 'default'){
            this.load.image('bg', 'assets/barcounter.jpg');
            this.load.image('table', 'assets/table.png');
            this.load.image('backboard', 'assets/backboard.png');
            this.load.image('pole', 'assets/pole.png');
        }else {
            this.load.image('abg', 'assets/animebarcounter.png');
            this.load.image('table', 'assets/atable.png');
            this.load.image('backboard', 'assets/abackboard.png');
            this.load.image('pole', 'assets/apole.png');
        };
        
        
        this.load.image('beerBottle', 'assets/beer.png');
        this.load.image('scalerBeerBottle', 'assets/scalerBeer.png');
        this.load.image('timerBeerBottle', 'assets/timerBeer.png');
        this.load.image('clearBeerBottle', 'assets/clearBeer.png');
        this.load.image('beerCrate', 'assets/crate.png');
        this.load.image('error', 'assets/error.png');
        this.load.image('frame', 'assets/frame.png');
        this.load.image('card', 'assets/card.png');
        this.load.spritesheet("return", "assets/return.png",{ frameWidth: 200, frameHeight: 100 });
        this.load.spritesheet("sfx", "assets/sfxButton.png",{ frameWidth: 200, frameHeight: 200 });
        this.load.spritesheet("musicButton", "assets/musicButton.png",{ frameWidth: 200, frameHeight: 200 });
        this.load.image('board', 'assets/board.png');
    
        if(this.mode == 'default' && this.difficulty == 'easy'){
            this.load.image('1', 'assets/rileyreid/1.png');
            this.load.image('2', 'assets/rileyreid/2.png');
            this.load.image('3', 'assets/rileyreid/3.png');
            this.load.image('4', 'assets/rileyreid/4.png');
        }else if(this.mode == 'anime' && this.difficulty == 'easy'){
            this.load.image('1', 'assets/zerotwo/1.png');
            this.load.image('2', 'assets/zerotwo/2.png');
            this.load.image('3', 'assets/zerotwo/3.png');
            this.load.image('4', 'assets/zerotwo/4.jpg');
        }else if(this.mode == 'default' && this.difficulty == 'normal'){
            this.load.image('1', 'assets/miamalkova/1.png');
            this.load.image('2', 'assets/miamalkova/2.png');
            this.load.image('3', 'assets/miamalkova/3.png');
            this.load.image('4', 'assets/miamalkova/4.png');
            this.load.image('5', 'assets/miamalkova/5.png');
        }else if(this.mode == 'anime' && this.difficulty == 'normal'){
            this.load.image('1', 'assets/asuna/1.png');
            this.load.image('2', 'assets/asuna/2.png');
            this.load.image('3', 'assets/asuna/3.png');
            this.load.image('4', 'assets/asuna/4.png');
            this.load.image('5', 'assets/asuna/5.png');
        }else if(this.mode == 'default' && this.difficulty == 'hard'){
            this.load.image('1', 'assets/abelladanger/1.png');
            this.load.image('2', 'assets/abelladanger/2.png');
            this.load.image('3', 'assets/abelladanger/3.png');
            this.load.image('4', 'assets/abelladanger/4.png');
            this.load.image('5', 'assets/abelladanger/5.png');
            this.load.image('6', 'assets/abelladanger/6.png');
        }else if(this.mode == 'anime' && this.difficulty == 'hard'){
            this.load.image('1', 'assets/hinata/1.png');
            this.load.image('2', 'assets/hinata/2.png');
            this.load.image('3', 'assets/hinata/3.png');
            this.load.image('4', 'assets/hinata/4.png');
            // this.load.image('5', 'assets/hinata/5.png');
            this.load.image('6', 'assets/hinata/6.png');
        }

        let x = Math.floor(Math.random() * 3);

        if(this.mode == 'default'){
            this.load.audio('cheer1', 'assets/audio/cheer1.mp3'); 
            this.load.audio('cheer2', 'assets/audio/cheer2.mp3'); 
            this.load.audio('cheer3', 'assets/audio/cheer3.mp3'); 
            this.load.audio('cheer4', 'assets/audio/cheer4.mp3');
            this.load.audio('winSound', 'assets/audio/winSound.mp3');
            switch (x) {
                case 0:
                    this.load.audio('music', 'assets/audio/music1.mp3'); 
                    break;
                case 1:
                    this.load.audio('music', 'assets/audio/music2.mp3'); 
                    break;
                case 2:
                    this.load.audio('music', 'assets/audio/music3.mp3'); 
                    break;
            }
        }else{
            this.load.audio('cheer1', 'assets/audio/as1.mp3'); 
            this.load.audio('cheer2', 'assets/audio/as2.mp3'); 
            this.load.audio('cheer3', 'assets/audio/as3.mp3'); 
            this.load.audio('cheer4', 'assets/audio/as4.mp3');
            this.load.audio('winSound', 'assets/audio/finish.mp3');
            switch (x) {
                case 0:
                    this.load.audio('music', 'assets/audio/music4.mp3'); 
                    break;
                case 1:
                    this.load.audio('music', 'assets/audio/music5.mp3'); 
                    break;
                case 2:
                    this.load.audio('music', 'assets/audio/music6.mp3'); 
                    break;
            }
        }

        this.load.audio('buttonClick', 'assets/audio/buttonclick.mp3'); 
        
        
        this.load.audio('strike', 'assets/audio/strike.mp3');
        this.load.audio('gameover', 'assets/audio/gameover.mp3');
        this.load.audio('grab', 'assets/audio/grab.mp3');
    };
    
    
    
    create(){
    

        // var keyObj = scene.input.keyboard.addKey('W');  // Get key object
        // var isDown = keyObj.isDown;
        var pause = false;

        

        this.input.keyboard.on('keydown-P', ()=>{

            this.scene.pause('Play');
            this.scene.launch('Pause');

        }, this);

        this.over = false;
        let gameW = this.sys.game.config.width;
        let gameH = this.sys.game.config.height;
        this.strikeX = gameW*0.1;
        if(this.mode == 'default'){
            this.background = this.add.sprite(0, 0 , 'bg');
        }else {
            this.background = this.add.sprite(0, 0 , 'abg');
        }
        this.background.setPosition(gameW/2,gameH/2).setDisplaySize(gameW, gameH);
    
        this.music = this.sound.add('music').setVolume(0.7);
        this.music.setLoop(true);
        this.buttonClick = this.sound.add('buttonClick');
        if(this.mode == 'default'){
            this.cheer1 = this.sound.add('cheer1').setVolume(0.3);
            this.cheer2 = this.sound.add('cheer2').setVolume(0.3);
            this.cheer3 = this.sound.add('cheer3').setVolume(0.3);
            this.cheer4 = this.sound.add('cheer4').setVolume(0.3);
        }else{
            this.cheer1 = this.sound.add('cheer1').setVolume(1);
            this.cheer2 = this.sound.add('cheer2').setVolume(1);
            this.cheer3 = this.sound.add('cheer3').setVolume(1);
            this.cheer4 = this.sound.add('cheer4').setVolume(1);
        }
        this.winSound = this.sound.add('winSound').setVolume(1);
        this.strikeSound = this.sound.add('strike').setVolume(0.2);
        this.gameover = this.sound.add('gameover').setVolume(1);
        this.catch = this.sound.add('grab').setVolume(0.25);
        this.music.play();
        this.music.setMute(this.musicClick);
        function stopSFX(scene, value){
            scene.winSound.setMute(value);
            scene.strikeSound.setMute(value);
            scene.gameover.setMute(value);
            scene.catch.setMute(value);
            scene.cheer1.setMute(value);
            scene.cheer2.setMute(value);
            scene.cheer3.setMute(value);
            scene.cheer4.setMute(value);

        };
        stopSFX(this, this.sfxClick);
        
        this.sfxButton = this.add.sprite(gameW*0.1, gameH/1.7, 'sfx').setFrame(0).setScale(0.7).setInteractive().on('pointerover', function(){
            
        }).on('pointerdown', function(event){
            
            if(this.sfxClick == false){
                this.sfxButton.setFrame(1);
                stopSFX(this, true);
                this.sfxClick = true;
            }else{
                this.sfxButton.setFrame(0);
                stopSFX(this, false);
                this.sfxClick = false;
            }
    
            
        }, this).on('pointerup', function(){
            
        }).on('pointerout', function(){
            
        });

        this.input.keyboard.on('keydown-N', ()=>{

            if(this.sfxClick == false){
                this.sfxButton.setFrame(1);
                stopSFX(this, true);
                this.sfxClick = true;
            }else{
                this.sfxButton.setFrame(0);
                stopSFX(this, false);
                this.sfxClick = false;
            }

        }, this);

        if(this.sfxClick == true){
            this.sfxButton.setFrame(1);
        };
        

        this.musicButton = this.add.sprite(gameW*0.2, gameH/1.7, 'musicButton').setFrame(0).setScale(0.7).setInteractive().on('pointerover', function(){
            
        }).on('pointerdown', function(event){
            if(this.musicClick == false){
                this.musicButton.setFrame(1);
                this.music.setMute(true);
                this.musicClick = true;
            }else{
                this.musicButton.setFrame(0);
                this.music.setMute(false);
                this.musicClick = false;
            }
            
        }, this).on('pointerup', function(){
            
        }).on('pointerout', function(){
            
        });

        this.input.keyboard.on('keydown-M', ()=>{

            if(this.musicClick == false){
                this.musicButton.setFrame(1);
                this.music.setMute(true);
                this.musicClick = true;
            }else{
                this.musicButton.setFrame(0);
                this.music.setMute(false);
                this.musicClick = false;
            }

        }, this);

        if(this.musicClick == true){
            this.musicButton.setFrame(1);
        };
        
        this.table = this.add.sprite(gameW/2, gameH/2 , 'table');
        this.switch;
        
        this.scoreToAdd = 0;
        this.strikes = 0;
        
        this.board = this.add.sprite(gameW *0.2 - 30, 150 , 'board').setScale(1.5);
        this.scoreTitle = this.add.text(gameW * 0.16, gameH * 0.05, 'SCORE:', { font: "bold 40px Arial", fill: "#ffffff", stroke: '#000000', strokeThickness: 5 });
        this.scoreNumber = this.add.text(gameW * 0.16 + this.scoreTitle.width, gameH* 0.05, '0', { font: "bold 40px Arial", fill: "#ffffff", stroke: '#000000', strokeThickness: 5 });
        this.scoreNumber.setText('0');

        this.pausetext = this.add.text(gameW * 0.02, gameH*0.7, "PRESS 'P' TO PAUSE", { font: "bold 25px Arial", fill: "#ffffff", stroke: '#000000', strokeThickness: 5 });
        this.mutemusictext = this.add.text(gameW * 0.02, gameH*0.8, "PRESS 'M' TO STOP MUSIC", { font: "bold 25px Arial", fill: "#ffffff", stroke: '#000000', strokeThickness: 5 });
        this.mutesfxtext = this.add.text(gameW * 0.02, gameH*0.9, "PRESS 'N' TO MUTE SOUND EFFECTS", { font: "bold 25px Arial", fill: "#ffffff", stroke: '#000000', strokeThickness: 5 });


        this.crate = this.physics.add.sprite(gameW/2, gameH/1.1 + 30 , 'beerCrate').setScale(0.4);
        this.crate.setImmovable(true);
    
        this.pole1 = this.add.sprite(gameW/2 + 343, gameH/2 , 'pole').setScale(1.5).setFlip(true, false);
    
        this.pole2 = this.add.sprite(gameW/2 - 343, gameH/2 , 'pole').setScale(1.5);
    
        // this.crate.setCollideWorldBounds(true);
    
        this.physics.world.bounds.width = this.table.width;
        this.physics.world.bounds.x = this.table.x - this.table.width/2;
        
        this.zone = this.add.zone(gameW/2 , gameH+30, 600, 10);
    
        this.physics.world.enable(this.zone);
        this.zone.body.setAllowGravity(false);
        this.zone.body.moves = false;
    
        console.log(this.zone);
    
        function ranInt(max) {
            return Math.floor(Math.random() * max);
          };
    
  
        //values
        this.lastBeerTime = 0;
        this.delta = 1000;
        this.speedBuff = 0;
        //settings
    
            // this.target = 3000;
        this.bottleScore = 10;
        this.threshold = 400;
        this.onScreenBottles = 0;
            // this.speed = 150;
            // this.timeToSpawn = 2000;
        
        
    
        
        this.ready=false;
        var timedEvent = this.time.delayedCall(1500 ,()=>{

            this.ready = true;
        } , [], this);
        
        this.backboard = this.add.sprite(gameW/1.22, gameH/2 , 'backboard').setDepth(1);
        this.frame = this.add.sprite(gameW/1.22, gameH/2 , 'frame').setDepth(3);
        if(this.mode =='anime'){
            this.frame.setTint(0xff00ff);
            this.backboard.setTint(0xffb7c5);
        };

        if(this.difficulty == 'easy' && this.mode == 'default'){
            this.img1 = this.add.sprite(this.frame.x, gameH/2 + 50 , '1').setDepth(2);
            this.img1.setScale(1.4).setVisible(false);
            this.img2 = this.add.sprite(this.frame.x, gameH/2 + 50 , '2').setDepth(2);
            this.img2.setScale(1).setVisible(false);
            this.img3 = this.add.sprite(this.frame.x, gameH/2 + 10 , '3').setDepth(2);
            this.img3.setScale(0.9).setVisible(false);
            this.win = this.add.sprite(gameW/2, gameH/2 , '4').setDepth(4);
            this.win.setScale(1).setVisible(false);
        }else if(this.difficulty == 'easy' && this.mode == 'anime'){
            this.img1 = this.add.sprite(this.frame.x, gameH/2 + 10 , '1').setDepth(2);
            this.img1.setScale(0.9).setVisible(false);
            this.img2 = this.add.sprite(this.frame.x, gameH/2 + 10 , '2').setDepth(2);
            this.img2.setScale(0.9).setVisible(false);
            this.img3 = this.add.sprite(this.frame.x, gameH/2 + 10 , '3').setDepth(2);
            this.img3.setScale(0.9).setVisible(false);
            this.win = this.add.sprite(gameW/2, gameH/2 - 100 , '4').setDepth(4);
            this.win.setScale(0.47).setVisible(false);
        }else  if(this.difficulty == 'normal' && this.mode == 'default'){

            this.img1 = this.add.sprite(this.frame.x, gameH/2 - 5 , '1').setDepth(2);
            this.img1.setScale(1).setVisible(false);
            this.img2 = this.add.sprite(this.frame.x, gameH/2 , '2').setDepth(2);
            this.img2.setScale(0.9).setVisible(false);
            this.img3 = this.add.sprite(this.frame.x, gameH/2 + 10 , '3').setDepth(2);
            this.img3.setScale(0.9).setVisible(false);
            this.img4 = this.add.sprite(this.frame.x, gameH/2 , '4').setDepth(2);
            this.img4.setScale(0.9).setVisible(false);
            this.win = this.add.sprite(gameW/2, gameH/2  - 90 , '5').setDepth(4);
            this.win.setScale(1).setVisible(false);
        }else if(this.difficulty == 'normal' && this.mode == 'anime'){
            this.img1 = this.add.sprite(this.frame.x, gameH/2 + 5 , '1').setDepth(2);
            this.img1.setScale(0.9).setVisible(false);
            this.img2 = this.add.sprite(this.frame.x, gameH/2 , '2').setDepth(2);
            this.img2.setScale(0.9).setVisible(false);
            this.img3 = this.add.sprite(this.frame.x, gameH/2 + 10 , '3').setDepth(2);
            this.img3.setScale(0.9).setVisible(false);
            this.img4 = this.add.sprite(this.frame.x, gameH/2 + 10 , '4').setDepth(2);
            this.img4.setScale(0.8).setVisible(false);
            this.win = this.add.sprite(gameW/2, gameH/2 - 90 , '5').setDepth(4);
            this.win.setScale(1.3).setVisible(false);
        }else if(this.difficulty == 'hard' && this.mode == 'default'){
            this.img1 = this.add.sprite(this.frame.x, gameH/2 , '1').setDepth(2);
            this.img1.setScale(0.9).setVisible(false);
            this.img2 = this.add.sprite(this.frame.x, gameH/2 + 20 , '2').setDepth(2);
            this.img2.setScale(1).setVisible(false);
            this.img3 = this.add.sprite(this.frame.x, gameH/2 + 10 , '3').setDepth(2);
            this.img3.setScale(0.9).setVisible(false);
            this.img4 = this.add.sprite(this.frame.x + 20 , gameH/2 + 50 , '4').setDepth(2);
            this.img4.setScale(1.1).setVisible(false);
            this.img5 = this.add.sprite(this.frame.x, gameH/2 + 40 , '5').setDepth(2);
            this.img5.setScale(1.15).setVisible(false);
            this.win = this.add.sprite(gameW/2, gameH/2 - 50 , '6').setDepth(4);
            this.win.setScale(1.5).setVisible(false);
        }else if(this.difficulty == 'hard' && this.mode == 'anime'){
            this.img1 = this.add.sprite(this.frame.x, gameH/2 + 10 , '1').setDepth(2);
            this.img1.setScale(0.9).setVisible(false);
            this.img2 = this.add.sprite(this.frame.x, gameH/2 + 10 , '2').setDepth(2);
            this.img2.setScale(0.9).setVisible(false);
            this.img3 = this.add.sprite(this.frame.x, gameH/2 + 10 , '3').setDepth(2);
            this.img3.setScale(0.9).setVisible(false);
            this.img4 = this.add.sprite(this.frame.x, gameH/2 + 10 , '4').setDepth(2);
            this.img4.setScale(0.9).setVisible(false);
            this.win = this.add.sprite(gameW/2, gameH/2 - 120 , '6').setDepth(4);
            this.win.setScale(1.1).setVisible(false);
        };

        this.shadow = this.add.sprite(this.img1.x, this.img1.y , '1').setDepth(1).setVisible(false).setScale(this.img1.scale);
        this.shadow.setOrigin(0.47, 0.48);
        this.shadow.tint = 0x000000;
        this.shadow.alpha = 0.6;
        this.shadow2 = this.add.sprite(this.img2.x, this.img2.y , '2').setDepth(1).setVisible(false).setScale(this.img2.scale);
        this.shadow2.setOrigin(0.47, 0.48);
        this.shadow2.tint = 0x000000;
        this.shadow2.alpha = 0.6;
        this.shadow3 = this.add.sprite(this.img3.x, this.img3.y , '3').setDepth(1).setVisible(false).setScale(this.img3.scale);
        this.shadow3.setOrigin(0.47, 0.48);
        this.shadow3.tint = 0x000000;
        this.shadow3.alpha = 0.6;
        if(this.img4 != null){
        this.shadow4 = this.add.sprite(this.img4.x, this.img4.y , '4').setDepth(1).setVisible(false).setScale(this.img4.scale);
        this.shadow4.setOrigin(0.47, 0.48);
        this.shadow4.tint = 0x000000;
        this.shadow4.alpha = 0.6;
        };
        if(this.img5 != null){
        this.shadow5 = this.add.sprite(this.img5.x, this.img5.y , '5').setDepth(1).setVisible(false).setScale(this.img5.scale);
        this.shadow5.setOrigin(0.47, 0.48);
        this.shadow5.tint = 0x000000;
        this.shadow5.alpha = 0.6;
        };
        this.shadow6 = this.add.sprite(this.win.x, this.win.y , this.win.texture).setDepth(1).setVisible(false).setScale(this.img3.scale);
        this.shadow6.setOrigin(0.6, 0.48);
        this.shadow6.tint = 0x000000;
        this.shadow6.alpha = 0.6;

        

        this.pole1.setInteractive().on('pointerdown', ()=>{

            this.score += 1000;
            console.log(this.bottles);
            for (let index = 0; index < this.bottles.length; index++) {
                const element = this.bottles[index];
                element.destroy();
                this.score += this.bottleScore;
            }

        });
        
        this.sw1 = true;
        this.sw2 = true;
        this.sw3 = true;
        this.sw4 = true;
        this.sw5 = true;
        this.sw6 = true;

        this.bottles = [];
    };
    
    
    update(time, delta){
        
        let gameW = this.sys.game.config.width;
        let gameH = this.sys.game.config.height;
        
        function distruge(obj){
            if(obj != null){
                obj.destroy()

            }
        }
        
        function cheer(scene){
            let x = Math.floor(Math.random() * 4);
            switch (x) {
                case 0:
                    scene.cheer1.play();
                    break;
                case 1:
                    scene.cheer2.play();
                break;
                case 2:
                    scene.cheer3.play();
                    break;
                case 3:
                    scene.cheer4.play();
                    break;
            }
        };

        function ranInt(max) {
            return Math.floor(Math.random() * max);
          };
    
        function strike(scene){
            let strike = scene.add.sprite(scene.strikeX + 50, gameH*0.2 , 'error');
            strike.setScale(0.15);
            scene.strikes += 1;
            console.log(scene.strikes);
            scene.strikeX += 120;
            scene.strikeSound.play();
        }
    
        function spawnBottle(scene, x , speed, score){
            let bottle = scene.physics.add.sprite(x, gameH - gameH - 100 , 'beerBottle');
            bottle.setScale(0.1).setGravityY(speed);
            scene.bottles.push(bottle);
            scene.onScreenBottles += 1;
            scene.physics.add.collider(scene.crate , bottle, ()=>{
                scene.catch.play();
                scene.onScreenBottles -= 1;
                if(scene.strikes < 3){
                scene.tween = scene.tweens.addCounter({
                    from: scene.score,
                    to: scene.score + score,
                    duration: 550,
                    paused: false
                });
            };
                scene.score += score;

                bottle.destroy();
            });
    
            scene.physics.add.collider(scene.zone , bottle, ()=>{
                if(scene.strikes <3){
                strike(scene);
                scene.onScreenBottles -= 1;
                bottle.destroy();
                }
            });
        };

        function spawnScalerBottle(scene, x , speed, score){
            let bottle = scene.physics.add.sprite(x, gameH - gameH - 100 , 'scalerBeerBottle');
            bottle.setScale(0.1).setGravityY(speed);
            scene.bottles.push(bottle);
            scene.onScreenBottles += 1;
            scene.physics.add.collider(scene.crate , bottle, ()=>{
                scene.catch.play();
                scene.onScreenBottles -= 1;
                if(scene.strikes < 3){
                scene.tween = scene.tweens.addCounter({
                    from: scene.score,
                    to: scene.score + score,
                    duration: 550,
                    paused: false
                });
            };
                scene.score += score;
                scene.crate.setScale(0.5);
                var scalerEvent = scene.time.delayedCall(5000, ()=>{
                    scene.crate.setScale(0.4);
                });
                bottle.destroy();
            });
    
            scene.physics.add.collider(scene.zone , bottle, ()=>{
                if(scene.strikes <3){
                strike(scene);
                scene.onScreenBottles -= 1;
                bottle.destroy();
                }
            });
        };
        

        function spawnTimeBottle(scene, x , speed, score){
            let bottle = scene.physics.add.sprite(x, gameH - gameH - 100 , 'timerBeerBottle');
            bottle.setScale(0.1).setGravityY(speed);
            scene.bottles.push(bottle);
            scene.onScreenBottles += 1;
            scene.physics.add.collider(scene.crate , bottle, ()=>{
                scene.catch.play();
                scene.onScreenBottles -= 1;
                if(scene.strikes < 3){
                scene.tween = scene.tweens.addCounter({
                    from: scene.score,
                    to: scene.score + score,
                    duration: 550,
                    paused: false
                });
            };
                scene.score += score;
                // scene.speedBuff = 500;
                scene.delta += 200;
                // var timerEvent = scene.time.delayedCall(5000, ()=>{
                //     // scene.speedBuff = 0;
                //     scene.delta -= 500;
                // });
                
                bottle.destroy();
            });
    
            scene.physics.add.collider(scene.zone , bottle, ()=>{
                if(scene.strikes <3){
                strike(scene);
                scene.onScreenBottles -= 1;
                bottle.destroy();
                }
            });
        };
    
        function spawnClearBottle(scene, x , speed, score){
            let bottle = scene.physics.add.sprite(x, gameH - gameH - 100 , 'clearBeerBottle');
            bottle.setScale(0.1).setGravityY(speed);
            // scene.onScreenBottles += 1;
            scene.bottles.push(bottle);
            scene.physics.add.collider(scene.crate , bottle, ()=>{
                scene.catch.play();
                scene.onScreenBottles -= 1;
                if(scene.strikes < 3){
                
            };
                
                for (let index = 0; index < scene.bottles.length; index++) {
                    const element = scene.bottles[index];
                    element.destroy();
               
                }
                scene.tween = scene.tweens.addCounter({
                    from: scene.score,
                    to: scene.score + score* scene.onScreenBottles,
                    duration: 550,
                    paused: false
                });
                // scene.score += score;
                scene.scoreNumber.setText(scene.score);
                scene.onScreenBottles = 0;
                bottle.destroy();
            });

            console.log(scene.onScreenBottles);
    
            scene.physics.add.collider(scene.zone , bottle, ()=>{
                if(scene.strikes <3){
                strike(scene);
                scene.onScreenBottles -= 1;
                bottle.destroy();
                }
            });
        };

        var diff = time - this.lastBeerTime;
        if (diff > this.delta && this.strikes < 3 && this.ready == true) {
          this.lastBeerTime = time;
          if (this.delta > this.threshold) {
            this.delta -= 20 - this.speedBuff;
          }
          var pos = (this.table.x - this.table.width/2) + ranInt(this.table.width);
          let chance = ranInt(100);
            if(chance <=0.02){
            spawnClearBottle(this, pos , this.speed, this.bottleScore);
          }else if(chance <= 0.04){
            spawnTimeBottle(this, pos , this.speed, this.bottleScore);
          }else if(chance <= 0.1){
            spawnScalerBottle(this, pos , this.speed, this.bottleScore);
          }else{
            spawnBottle(this, pos , this.speed, this.bottleScore); 
          }
          
        }

        
        if(this.over == false){
        this.table.setInteractive().on('pointerover', ()=>{
            this.switch = true;
        }).on('pointerout', ()=>{
            this.switch = false;
        });
    };

        if(this.difficulty != 'hard'){
        if(this.switch == true){
            this.crate.x = game.input.mousePointer.x;
        };
    }else{
        this.crate.x = game.input.mousePointer.x;
        if(this.switch == true){
            this.crate.setVisible(true);
        }else{
            this.crate.setVisible(false);
        }
    }
    
        if(this.tween != null){
            this.scoreNumber.setText(Math.trunc(this.tween.getValue()));
        };
        
        if(this.difficulty == 'easy'){
            this.target = 3000;
            this.threshold = 500;
            
            if(this.score < 1000){
                this.img1.setVisible(true);
                this.shadow.setVisible(true);
                this.speed = 150;
                this.timeToSpawn = 2000;
                this.bottleScore = 10;
           
                
            }else if(this.score < 2000){
                this.img1.destroy()
                this.img2.setVisible(true);
                this.shadow.setVisible(false);
                this.shadow2.setVisible(true);
                this.speed = 250;
                this.timeToSpawn = 1800;
                this.bottleScore = 10;
             
                if (this.sw1 == true ){
                    cheer(this);
                };
                this.sw1 = false;
            }else if(this.score < 3000){
                this.img2.destroy()
                this.img3.setVisible(true);
                this.shadow2.setVisible(false);
                this.shadow3.setVisible(false);
                this.speed = 350;
                this.timeToSpawn = 1600;
                this.bottleScore = 10;
   
                if (this.sw2 == true ){
                    cheer(this);
                };
                this.sw2 = false;
            }
      };
        if(this.difficulty == 'normal'){
            this.target = 5000;
            
            
            if(this.score < 1000){
                this.img1.setVisible(true);
                this.shadow.setVisible(true);
                this.speed = 200;
                this.threshold = 500;
                this.bottleScore = 10;
            
            }else if(this.score < 2000){
                this.img1.setVisible(false);
                this.img2.setVisible(true);
                this.shadow.setVisible(false);
                this.shadow2.setVisible(true);
                this.speed = 300;
                this.threshold = 400;
                this.bottleScore = 10;
                if (this.sw1 == true ){
                    cheer(this);
                };
                this.sw1 = false;
            }else if(this.score < 3000){
                this.threshold = 400;
                this.img2.setVisible(false);
                this.img3.setVisible(true);
                this.shadow2.setVisible(false);
                this.shadow3.setVisible(true);
                this.speed = 350;
                this.bottleScore = 10;
                if (this.sw2 == true ){
                    cheer(this);
                };
                this.sw2 = false;
            }else if(this.score < 4000){
                this.img3.setVisible(false);
                this.img4.setVisible(true);
                this.shadow3.setVisible(false);
                this.shadow4.setVisible(true);
                
                this.speed = 500;
                this.threshold = 350;
                this.bottleScore = 10;
                if (this.sw3 == true ){
                    cheer(this);
                };
                this.sw3 = false;
            }else if(this.score < 4000){

                this.speed = 600;
                this.threshold = 300;
                this.bottleScore = 10;
            }
            };
            
        if(this.difficulty == 'hard'){
            this.target = 6000;
            
            
            if(this.score < 1000){
                this.img1.setVisible(true);
                this.shadow.setVisible(true);
                this.speed = 200;
                this.threshold = 400;
                this.bottleScore = 10;
             
            }else if(this.score < 2000){
                this.img1.setVisible(false);
                this.img2.setVisible(true);
                this.shadow.setVisible(false);
                this.shadow2.setVisible(true);
                this.speed = 350;
                this.threshold = 400;
                this.bottleScore = 10;
                if (this.sw1 == true ){
                    cheer(this);
                };
                this.sw1 = false;
            }else if(this.score < 3000){
                this.img2.setVisible(false);
                this.img3.setVisible(true);
                this.shadow2.setVisible(false);
                this.shadow3.setVisible(true);
                this.speed = 500;
                this.threshold = 350;
                this.bottleScore = 10;
                if (this.sw2 == true ){
                    cheer(this);
                };
                this.sw2 = false;
            }else if(this.score < 4000){
                this.img3.setVisible(false);
                this.img4.setVisible(true);
                this.shadow3.setVisible(false);
                this.shadow4.setVisible(true);
                this.speed = 600;
                this.threshold = 300;
                this.bottleScore = 10;
                if (this.sw3 == true ){
                    cheer(this);
                };
                this.sw3 = false;
            }else if(this.score < 5000){
                if(this.mode == 'default'){
                this.img4.setVisible(false);
                this.img5.setVisible(true);
                this.shadow4.setVisible(false);
                this.shadow5.setVisible(true);
                }
                this.speed = 600;
                this.threshold = 250;
                this.bottleScore = 10;
                if (this.sw4 == true ){
                    cheer(this);
                };
                this.sw4 = false;
            }else if(this.score < 6000){
                this.speed = 700;
                this.threshold = 250;
                this.bottleScore = 10;
               
            }
            };
            
            if(this.score >= this.target || this.strikes >= 3){
                this.ready = false;
                this.over = true;
                this.switch = false;
                let card = this.add.sprite(gameW/2, gameH/2 , 'card').setDepth(4).setScale(2);
                // if(this.difficulty == 'easy'){
                //     this.img3.setVisible(false);
                //     this.shadow3.setVisible(false);
                // }else if(this.difficulty == 'normal'){
                //     this.img4.setVisible(false);
                //     this.shadow4.setVisible(false);
                // }else if(this.difficulty == 'hard'){
                //     if(this.mode == 'default'){
                //         this.img5.setVisible(false);
                //         this.shadow5.setVisible(false);
                //     }else {
                //         this.img4.setVisible(false);
                //         this.shadow4.destroy();
                //     }
                // };
                // this.board.destroy();
                if(this.score >= this.target){
                    this.win.setVisible(true).setDepth(5);
                    if (this.sw5 == true ){
                        this.winSound.play();
                    };
                    this.sw5 = false;
                    if(this.difficulty != 'easy' && this.mode != 'anime'){
                        this.shadow6.setVisible(true).setDepth(5);
                    };
                    this.cardText = this.add.text(gameW/2, gameH/2 + 200, 'Congratulations!', { font: "bold 40px Arial", fill: "#7CF3A0", stroke: '#000000', strokeThickness: 5 }).setDepth(6).setOrigin(0.5, 0.5);

            }else{
                    this.cardText = this.add.text(gameW/2, gameH/2, "You lost. But it's fine , just try again!", { font: "bold 55px Arial", fill: "#FAD02C", stroke: '#000000', strokeThickness: 5 }).setDepth(6).setOrigin(0.5, 0.5);
                    if (this.sw5 == true ){
                        this.gameover.play();
                    };
                    this.sw5 = false;
                };
                
                this.return = this.add.sprite(gameW/2, gameH * 0.8, 'return').setDepth(6).setScale(0.7).setFrame(0).setInteractive().on('pointerover', function(){
                    this.setFrame(1);
                }).on('pointerdown', function(event){
                    this.music.stop();
                    this.return.setFrame(1);
                    this.buttonClick.play();
                    this.table.setInteractive(false);
                    distruge(this.img1);
                    distruge(this.img2);
                    distruge(this.img3);
                    distruge(this.img4);
                    distruge(this.img5);
                    distruge(this.img6);
                    distruge(this.shadow);
                    distruge(this.shadow2);
                    distruge(this.shadow3);
                    distruge(this.shadow4);
                    distruge(this.shadow5);
                    distruge(this.shadow6);
                    distruge(this.win);
                    distruge(this.pole1);
                    distruge(this.pole2);
                    distruge(this.table);
                    distruge(this.backboard);
                    distruge(this.background);
                    distruge(this.cheer1);
                    distruge(this.cheer2);
                    distruge(this.cheer3);
                    distruge(this.cheer4);
                    distruge(this.winSound);

                    var timedEvent = this.time.delayedCall(1500, ()=>{
                        
                        // this.win.destroy();
                        // this.shadow6.destroy();



                        if(this.mode == 'default'){
                            this.textures.remove('bg');
                            this.textures.remove('table');
                            this.textures.remove('backboard');
                            this.textures.remove('pole');
                        }else {
                            this.textures.remove('abg');
                            this.textures.remove('table');
                            this.textures.remove('backboard');
                            this.textures.remove('pole');
                        };
                        
                        this.cache.audio.remove('music');
                        this.cache.audio.remove('cheer1');
                        this.cache.audio.remove('cheer2');
                        this.cache.audio.remove('cheer3');
                        this.cache.audio.remove('cheer4');
                        this.cache.audio.remove('winSound');
                      
                    
                        if(this.mode == 'default' && this.difficulty == 'easy'){
                            this.textures.remove('1');
                            this.textures.remove('2');
                            this.textures.remove('3');
                            this.textures.remove('4');
                        }else if(this.mode == 'anime' && this.difficulty == 'easy'){
                            this.textures.remove('1');
                            this.textures.remove('2');
                            this.textures.remove('3');
                            this.textures.remove('4');
                        }else if(this.mode == 'default' && this.difficulty == 'normal'){
                            this.textures.remove('1');
                            this.textures.remove('2');
                            this.textures.remove('3');
                            this.textures.remove('4');
                            this.textures.remove('5');
                        }
                        else if(this.mode == 'anime' && this.difficulty == 'normal'){
                            this.textures.remove('1');
                            this.textures.remove('2');
                            this.textures.remove('3');
                            this.textures.remove('4');
                            this.textures.remove('5');
                        }else if(this.mode == 'default' && this.difficulty == 'hard'){
                            this.textures.remove('1');
                            this.textures.remove('2');
                            this.textures.remove('3');
                            this.textures.remove('4');
                            this.textures.remove('5');
                            this.textures.remove('6');
                        }else if(this.mode == 'anime' && this.difficulty == 'hard'){
                            this.textures.remove('1');
                            this.textures.remove('2');
                            this.textures.remove('3');
                            this.textures.remove('4');;
                            // this.textures.remove('5');
                            this.textures.remove('6');
                        }
                        // this.scene.restart('Menu');
                        
                        let info = [this.sfxClick, this.musicClick];
                        console.log(info);
                        this.scene.start('Menu', info);
                       
                } , [], this);
        
                }, this).on('pointerup', function(){
                    this.setFrame(0);
                    
                }).on('pointerout', function(){
        
                    this.setFrame(0);
                });
            };
    };
    
    };

   


   