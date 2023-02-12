import Phaser from "phaser";
import game from "./menu";
import Menu from "./menu";

export default class Play extends Phaser.Scene{


    constructor(){
        super({ key: 'Play' });
        this.state = {};
        };
    
    init(info){
        if(info[1]=='doom'){
            this.mode = 'doom';
            this.doommode= info[0];
        }else{
        this.mode = info[0];
        };
        this.difficulty = info[1];
        this.sfxClick = info[2];
        this.musicClick = info[3];
        this.osu = info[4];
        this.scene.stop('Menu');

        this.score = 0;
        this.bottlesSpawned = 0;
        this.bottlesLeft = 600;
        this.osuScore = 600;
        // if(this.scoreNumber != null){
        // this.scoreNumber.setText('0');
        // };
        console.log(this.sfxClick, this.musicClick, this.osu);
    };
    
    preload(){
        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x222222, 0.8);
        this.progressBox.fillRect(240, 270, 320, 50);
        

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        this.progressBar.x=this.sys.game.config.width/2 -400;
        this.progressBox.x = this.sys.game.config.width/2 - 400;
        this.loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        this.loadingText.setOrigin(0.5, 0.5);
        
        this.percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        this.percentText.setOrigin(0.5, 0.5);
        
        this.assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        this.assetText.setOrigin(0.5, 0.5);

        this.progressBar.setVisible(true);
        this.progressBox.setVisible(true);
        this.loadingText.setVisible(true);
            this.percentText.setVisible(true);
            this.assetText.setVisible(true);
        
        this.load.on('progress', (value)=>{
            this.percentText.setText(parseInt(value * 100) + '%');
            this.progressBar.clear();
            this.progressBar.fillStyle(0xffffff, 1);
            this.progressBar.fillRect(250, 280, 300 * value, 30);
        });
        
        this.load.on('fileprogress', (file)=> {
            this.assetText.setText('Loading asset: ' + file.key);
        });
        this.load.on('complete', ()=>{
            this.progressBar.setVisible(false);
            this.progressBox.setVisible(false);
            this.loadingText.setVisible(false);
            this.percentText.setVisible(false);
            this.assetText.setVisible(false);
        });


        //load images
        if(this.mode == 'default'){
            this.load.image('bg', 'assets/barcounter.jpg');
            if(this.osu != true ){
            this.load.image('table', 'assets/table.png');
            }else{
                this.load.image('table', 'assets/osutable.png');
            };
            this.load.image('backboard', 'assets/backboard.png');
            this.load.image('pole', 'assets/pole.png');
        }else if(this.mode == 'anime'){
            this.load.image('abg', 'assets/animebarcounter.png');
            this.load.image('table', 'assets/atable.png');
            this.load.image('backboard', 'assets/abackboard.png');
            this.load.image('pole', 'assets/apole.png');
        }else{
            // this.load.image('abg', 'assets/animebarcounter.png');
            if(this.doommode=='anime'){
                this.load.video('poltergeist', 'assets/video/poltergeist.mp4', 'loadeddata', false, true);
            }else{
                this.load.video('limewire', 'assets/video/limewire.mp4', 'loadeddata', false, true);
            };
            this.load.spritesheet('table', 'assets/doomtable.png',{ frameWidth: 621, frameHeight: 900 });
            this.load.image('pole', 'assets/doompole.png');
            this.load.image('doomCrate', 'assets/doomcrate.png');
            this.load.image('blackCrate', 'assets/doomcrateblack.png');
        };
        
        
        if(this.difficulty == 'doom'){
            this.load.image('doomBottle', 'assets/doomBeer.png');
            this.load.image('blackBottle', 'assets/doomBeerblack.png');
        }else{
        this.load.image('beerBottle', 'assets/beer.png');
        this.load.image('scalerBeerBottle', 'assets/scalerBeer.png');
        this.load.image('timerBeerBottle', 'assets/timerBeer.png');
        this.load.image('clearBeerBottle', 'assets/clearBeer.png');
        if(this.osu == true){
            this.load.image('strikeBottle', 'assets/strikeBeer.png');
        };
    };
        this.load.image('beerCrate', 'assets/crate.png');
        this.load.image('error', 'assets/error.png');
        this.load.image('frame', 'assets/frame.png');
        this.load.image('board', 'assets/board.png');

        this.load.image('card', 'assets/card.png');
        this.load.spritesheet("return", "assets/return.png",{ frameWidth: 200, frameHeight: 100 });
        this.load.spritesheet("sfx", "assets/sfxButton.png",{ frameWidth: 200, frameHeight: 200 });
        this.load.spritesheet("musicButton", "assets/musicButton.png",{ frameWidth: 200, frameHeight: 200 });
        
    
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
            this.load.image('7', 'assets/abelladanger/7.png');
        }else if(this.mode == 'anime' && this.difficulty == 'hard'){
            this.load.image('1', 'assets/hinata/1.png');
            this.load.image('2', 'assets/hinata/2.png');
            this.load.image('3', 'assets/hinata/3.png');
            this.load.image('4', 'assets/hinata/4.png');
            this.load.image('5', 'assets/hinata/5.png');
            this.load.image('6', 'assets/hinata/6.png');
            this.load.image('7', 'assets/hinata/7.png');
        }else if(this.difficulty == 'doom' && this.doommode == 'anime'){
            this.load.video('animedoom', 'assets/video/animedoom.mp4');
        }else if(this.difficulty == 'doom' && this.doommode == 'default'){
            this.load.video('defdoom', 'assets/video/defdoom.mp4');
        };

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
        }else if(this.mode == 'anime'){
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
        }else{
            if(this.doommode=='anime'){
            this.load.audio('music', 'assets/audio/poltergeist.mp3');
            }else{
                this.load.audio('music', 'assets/audio/limewire.mp3');
            };
        };

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
            if(this.difficulty == 'doom'){
                this.background.isPaused(true);
            };
            this.music.pause();
            this.scene.pause('Play');
            this.scene.launch('Pause');

        }, this);

        this.over = false;
        let gameW = this.sys.game.config.width;
        let gameH = this.sys.game.config.height;
        this.strikeX = gameW*0.1;

        if(this.mode == 'default'){
            this.background = this.add.sprite(0, 0 , 'bg');
            this.background.setPosition(gameW/2,gameH/2).setDisplaySize(gameW, gameH);
        }else if(this.mode == 'anime'){
            this.background = this.add.sprite(0, 0 , 'abg');
            this.background.setPosition(gameW/2,gameH/2).setDisplaySize(gameW, gameH);
        }else{
            // this.background = this.add.sprite(0, 0 , 'abg');
            if(this.doommode=='anime'){
            this.background = this.add.video(gameW/2,gameH/2, 'poltergeist').setDisplaySize(gameW, gameH);
            }else{
                this.background = this.add.video(gameW/2,gameH/2, 'limewire').setDisplaySize(gameW, gameH);
            };
            this.background.play(true).setMute(true);
    
            // Prevents video freeze when game is out of focus (i.e. user changes tab on the browser)
            // this.background.setPaused(false);
        };
        
    
        this.music = this.sound.add('music').setVolume(0.7);

        this.buttonClick = this.sound.add('buttonClick');
        if(this.mode == 'default'){
            this.music.setLoop(true);
            this.cheer1 = this.sound.add('cheer1').setVolume(0.3);
            this.cheer2 = this.sound.add('cheer2').setVolume(0.3);
            this.cheer3 = this.sound.add('cheer3').setVolume(0.3);
            this.cheer4 = this.sound.add('cheer4').setVolume(0.3);
        }else if(this.mode == 'anime'){
            this.music.setLoop(true);
            this.cheer1 = this.sound.add('cheer1').setVolume(1);
            this.cheer2 = this.sound.add('cheer2').setVolume(1);
            this.cheer3 = this.sound.add('cheer3').setVolume(1);
            this.cheer4 = this.sound.add('cheer4').setVolume(1);
        }
        if(this.difficulty != 'doom'){
            this.winSound = this.sound.add('winSound').setVolume(1);
            this.catch = this.sound.add('grab').setVolume(0.25);

        };
        
        function stopSFX(scene, value){
            scene.strikeSound.setMute(value);
            scene.gameover.setMute(value);
            

            if(scene.difficulty != 'doom'){
            scene.winSound.setMute(value);
            scene.strikeSound.setMute(value);
            scene.gameover.setMute(value);
            scene.catch.setMute(value);
            scene.cheer1.setMute(value);
            scene.cheer2.setMute(value);
            scene.cheer3.setMute(value);
            scene.cheer4.setMute(value);
            };
        };

        this.strikeSound = this.sound.add('strike').setVolume(0.2);
        this.gameover = this.sound.add('gameover').setVolume(1);
        
        this.music.play();
        this.music.setMute(this.musicClick);
        
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
        if(this.difficulty == 'doom'){
            this.table.setFrame(0);
        };
        this.table.setDisplaySize(this.table.width, gameH);
        this.switch;
        
        this.scoreToAdd = 0;
        this.strikes = 0;
        
        this.board = this.add.sprite(gameW *0.2 - 30, 150 , 'board').setScale(1.5);
        this.scoreTitle = this.add.text(gameW * 0.16, gameH * 0.05, 'SCORE:', { font: "bold 40px Arial", fill: "#ffffff", stroke: '#000000', strokeThickness: 5 });
        this.scoreNumber = this.add.text(gameW * 0.16 + this.scoreTitle.width, gameH* 0.05, '0', { font: "bold 40px Arial", fill: "#ffffff", stroke: '#000000', strokeThickness: 5 });
        this.scoreNumber.setText('0');

        if(this.osu == true){
            this.scoreTitle.setText("Bottles Left:");
            this.scoreTitle.x -= 100;
        };

        this.pausetext = this.add.text(gameW * 0.02, gameH*0.7, "PRESS 'P' TO PAUSE", { font: "bold 25px Arial", fill: "#ffffff", stroke: '#000000', strokeThickness: 5 });
        this.mutemusictext = this.add.text(gameW * 0.02, gameH*0.8, "PRESS 'M' TO STOP MUSIC", { font: "bold 25px Arial", fill: "#ffffff", stroke: '#000000', strokeThickness: 5 });
        this.mutesfxtext = this.add.text(gameW * 0.02, gameH*0.9, "PRESS 'N' TO MUTE SOUND EFFECTS", { font: "bold 25px Arial", fill: "#ffffff", stroke: '#000000', strokeThickness: 5 });

        if(this.difficulty == 'doom'){
            this.crate = this.physics.add.sprite(gameW/2, gameH/1.1 + 30 , 'doomCrate').setScale(0.4);
        }else{
            this.crate = this.physics.add.sprite(gameW/2, gameH/1.1 + 30 , 'beerCrate').setScale(0.4);
        }
        
        this.crate.setImmovable(true);
    
        this.pole1 = this.add.sprite(gameW/2 + 343, gameH/2 , 'pole').setScale(1.5).setFlip(true, false);
        // this.pole1.setDisplaySize(this.pole1.width, gameH);
        this.pole2 = this.add.sprite(gameW/2 - 343, gameH/2 , 'pole').setScale(1.5);
        // this.pole2.setDisplaySize(this.pole2.width, gameH);
        // this.crate.setCollideWorldBounds(true);

        if(this.difficulty == 'doom'){
            this.pole1.x = (this.table.x + this.table.width /2 ) + this.pole2.width - 24;
            this.pole2.x = (this.table.x - this.table.width /2 ) - this.pole2.width + 24;
            this.pole1.setDisplaySize(this.pole1.width * 0.9, gameH);
            this.pole2.setDisplaySize(this.pole2.width * 0.9, gameH);
            this.board.setVisible(false);
            this.scoreTitle.setVisible(false);
            this.scoreNumber.setVisible(false);
        };
    
        this.physics.world.bounds.width = this.table.width;
        this.physics.world.bounds.x = this.table.x - this.table.width/2;
        
        this.zone = this.add.zone(gameW/2 , gameH+30, this.table.width, 10);
        
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
        this.bottlesLeft;
            // this.speed = 150;
            // this.timeToSpawn = 2000;
        
        
    
        
        this.ready=false;
        var timedEvent = this.time.delayedCall(1500 ,()=>{
            this.scoreNumber.setText('0');
            this.ready = true;
        } , [], this);
        
        if(this.difficulty != 'doom'){
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
            this.win = this.add.sprite(gameW/2, gameH/2 - 50 , '4').setDepth(4);
            this.win.setScale(1.5).setVisible(false);
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
            this.img6 = this.add.sprite(this.frame.x - 10, gameH/2 + 10 , '6').setDepth(2);
            this.img6.setScale(0.8).setVisible(false);
            this.win = this.add.sprite(gameW/2, gameH/2 - 50 , '7').setDepth(4);
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
            this.img5 = this.add.sprite(this.frame.x, gameH/2 + 10 , '5').setDepth(2);
            this.img5.setScale(0.9).setVisible(false);
            this.img6 = this.add.sprite(this.frame.x, gameH/2 + 10 , '7').setDepth(2);
            this.img6.setScale(0.9).setVisible(false);
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
        if(this.img6 != null){
            this.shadow6 = this.add.sprite(this.img6.x, this.img6.y , '5').setDepth(1).setVisible(false).setScale(this.img6.scale);
            this.shadow6.setOrigin(0.47, 0.48);
            this.shadow6.tint = 0x000000;
            this.shadow6.alpha = 0.6;
        };
        this.shadow7 = this.add.sprite(this.win.x, this.win.y , this.win.texture).setDepth(1).setVisible(false).setScale(this.img3.scale);
        this.shadow7.setOrigin(0.6, 0.48);
        this.shadow7.tint = 0x000000;
        this.shadow7.alpha = 0.6;
        
    };
        
//debugging
        // this.pole1.setInteractive().on('pointerdown', ()=>{

        //     if(this.osu == true){
        //     this.bottlesSpawned += 100;
        //     console.log(this.osuScore);
        //     }else{
        //         this.score += 1000;
        //     }
       
        //     // this.music.stop();

        // });
        
        this.sw1 = true;
        this.sw2 = true;
        this.sw3 = true;
        this.sw4 = true;
        this.sw5 = true;
        this.sw6 = true;

        this.bottles = [];
        this.strikeBottles = [];
        this.bottlesSpawned = 0;
        this.currentbottle;
        this.strikeLimiter = false;
        this.score = 0;
        this.inverted = false;
        
        if(this.difficulty == 'doom' && this.doommode == 'anime' ){
            var timedEvent = this.time.delayedCall(13500, ()=>{
                this.speedBuff = 30;
            
            });

            var timedEvent = this.time.delayedCall(19000, ()=>{
       
                this.background.setAlpha(0.5);
            });

            var timedEvent = this.time.delayedCall(38000, ()=>{
                this.speedBuff = 2;
                this.delta += 220;
                this.speed = 1300;
                this.threshold = 200;
                this.background.setAlpha(0.8);
            });

            var timedEvent = this.time.delayedCall(76000, ()=>{
                this.speedBuff = 10;
                this.delta += 220;
                this.speed = 600;
                this.threshold = 250;
                inversion(this);
            });

            var timedEvent = this.time.delayedCall(96000, ()=>{
                this.speedBuff = 10;
                this.delta += 220;
                this.speed = 1300;
                this.threshold = 200;
                reversion(this);
            });

            this.target = 10000;
                this.speedBuff = 0;
                this.speed = 1200;
                this.threshold = 180;
                this.bottleScore = 10;
              
         };

         if(this.difficulty == 'doom' && this.doommode == 'default' ){
            var timedEvent = this.time.delayedCall(20000, ()=>{
                this.speedBuff = 30;
                
            });

            var timedEvent = this.time.delayedCall(22000, ()=>{
       
                this.background.setAlpha(0.5);
            });

            var timedEvent = this.time.delayedCall(33000, ()=>{
                this.speedBuff = 5;
                this.delta += 220;
                this.speed = 1300;
                this.threshold = 200;
                this.background.setAlpha(1);
            });

            var timedEvent = this.time.delayedCall(66000, ()=>{
                this.speedBuff = 10;
                this.delta += 220;
                this.speed = 800;
                this.threshold = 220;
            });


            var timedEvent = this.time.delayedCall(78000, ()=>{
                this.speedBuff = 10;
                this.delta += 220;
                this.speed = 600;
                this.threshold = 250;
                inversion(this);
            });

            var timedEvent = this.time.delayedCall(98000, ()=>{
                this.speedBuff = 0;
                this.speed = 1200;
                this.threshold = 200;
                this.bottleScore = 10;
                reversion(this);
            });

            var timedEvent = this.time.delayedCall(113000, ()=>{
                this.speedBuff = 30;
                this.background.setAlpha(0.5);
            });

            var timedEvent = this.time.delayedCall(121000, ()=>{
                this.speedBuff = 40;
                
            });

            this.target = 10000;
            this.speedBuff = 0;
            this.speed = 1200;
            this.threshold = 180;
            this.bottleScore = 10;
            
           
         };

         function hideUI(scene){
            // scene.board.setVisible(false);
            // scene.scoreTitle.setVisible(false);
            // scene.scoreNumber.setVisible(false);
            scene.pausetext.setVisible(false);
            scene.mutemusictext.setVisible(false);
            scene.mutesfxtext.setVisible(false);
            scene.sfxButton.setVisible(false);
            scene.musicButton.setVisible(false);
         };

         function showUI(scene){
            // scene.board.setVisible(true);
            // scene.scoreTitle.setVisible(true);
            // scene.scoreNumber.setVisible(true);
            scene.pausetext.setVisible(true);
            scene.mutemusictext.setVisible(true);
            scene.mutesfxtext.setVisible(true);
            scene.sfxButton.setVisible(true);
            scene.musicButton.setVisible(true);
         };

         function inversion(scene){
            scene.inverted = true;
            hideUI(scene);
            
            
            scene.table.setFrame(1);
            scene.orginialtablewidth = scene.table.width;
            scene.table.width = scene.table.width * 1.7;
            scene.zone.width = scene.table.width;
            scene.table.setDisplaySize(scene.table.width, gameH);
            scene.pole1.x = (scene.table.x + scene.table.width /2 ) + scene.pole2.width - 24;
            scene.pole2.x = (scene.table.x - scene.table.width /2 ) - scene.pole2.width + 24;
            scene.crate2 = scene.physics.add.sprite(gameW/2, gameH/1.1 + 30 , 'blackCrate').setScale(0.4);
            scene.crate2.setImmovable(scene);
            scene.crate2.setOrigin(0.5,0.5);
            scene.input.on('pointermove', function(pointer) {

                scene.crate2.x = gameW - pointer.x ;
              
            });

            scene.crate.setScale(0.5);
            scene.crate2.setScale(0.5);

            for (let index = 0; index < scene.bottles.length; index++) {
                const element = scene.bottles[index];
                element.destroy();
           
            };
         };

         function reversion(scene){
            scene.inverted = false;
            showUI(scene);
       
            scene.table.setFrame(0);
            scene.table.width = scene.orginialtablewidth;
            scene.zone.width = scene.table.width;
            scene.table.setDisplaySize(scene.table.width, gameH);
            scene.pole1.x = (scene.table.x + scene.table.width /2 ) + scene.pole2.width - 24;
            scene.pole2.x = (scene.table.x - scene.table.width /2 ) - scene.pole2.width + 24;
            scene.crate2.destroy();
            for (let index = 0; index < scene.bottles.length; index++) {
                const element = scene.bottles[index];
                element.destroy();
           
            };

            scene.crate.setScale(0.4);
            scene.crate2.setScale(0.4);
         };

         function distruge(obj){
            if(obj != null){
                obj.destroy()

            }
        }
         

        if(this.difficulty == 'doom'){
            this.music.on('complete', ()=>{
                this.ready = false;
                this.over = true;
                this.switch = false;
             
                this.buttonClick.play();
                this.table.setInteractive(false);
                    distruge(this.pole1);
                    distruge(this.pole2);
                    distruge(this.table);
                    
                    distruge(this.winSound);
                    hideUI(this);
                    console.log('win');
                    this.background.stop();
                    distruge(this.background);
                    if(this.doommode=='anime'){
                        this.win = this.add.video(gameW/2,gameH/2, 'animedoom').setDisplaySize(gameW, gameH);
                    }else{
                        this.win = this.add.video(gameW/2,gameH/2, 'defdoom').setDisplaySize(gameW, gameH);
                    };
                    
                    this.win.play(true);

                    this.return = this.add.sprite(gameW/2, gameH * 0.8, 'return').setDepth(6).setScale(0.7).setFrame(0).setInteractive().on('pointerover', function(){
                        this.setFrame(1);
                    }).on('pointerdown', function(event){
                    
                        this.return.setFrame(1);
                        this.buttonClick.play();
            
                        distruge(this.win);
                        
                        var timedEvent = this.time.delayedCall(1500, ()=>{
                            
                            // this.win.destroy();
                            // this.shadow6.destroy();
    
    
    
                                
                                this.textures.remove('table');
                                this.textures.remove('pole');
                           
                            
                            this.cache.audio.remove('music');
                            this.cache.video.remove('poltergeist');
                            this.cache.video.remove('animedoom');
                        
                       
                            // this.scene.restart('Menu');
                            
                            let info = [this.sfxClick, this.musicClick, true];
                            console.log(info);
                            this.score = 0;
                    this.bottlesSpawned = 0;
                    this.osuScore = 0;
                    
                    distruge(this.scoreNumber);
                        distruge(this.scoreTitle);
                            this.scene.start('Menu', info);
                           
                    } , [], this);
            
                    }, this).on('pointerup', function(){
                        this.setFrame(0);
                        
                    }).on('pointerout', function(){
            
                        this.setFrame(0);
                    });
                });
        };

     
        if(this.difficulty == 'doom'){
            this.bottletexture = 'doomBottle';
        }else{
            this.bottletexture = 'beerBottle';
        };

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
            scene.scene.pause('Play');
            scene.scene.launch('Check');
            
        };


        function ranInt(max) {
            return Math.floor(Math.random() * max);
          };
    
        function strike(scene){

            if(scene.osu == true){

                if(scene.strikeLimiter == false){
                    let strike = scene.add.sprite(scene.strikeX + 50, gameH*0.2 , 'error');
                    strike.setScale(0.15);
                    scene.strikes += 1;
                    console.log(scene.strikes);
                    scene.strikeX += 120;
                    if(scene.over == false){
                    scene.strikeSound.play();
                    };
                }

                scene.strikeLimiter = true;
                var timedEvent = scene.time.delayedCall(1000, ()=>{
                    scene.strikeLimiter = false;
                });
            }else{
                if(scene.over == false){
                let strike = scene.add.sprite(scene.strikeX + 50, gameH*0.2 , 'error');
                strike.setScale(0.15);
                scene.strikes += 1;
                console.log(scene.strikes);
                scene.strikeX += 120;
                
                    scene.strikeSound.play();
                    };
            }
        };
        
      
        function checkOverlap(spriteA, spriteB) {
            var boundsA = spriteA.getBounds();
            var boundsB = spriteB.getBounds();
            return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
        };

       
        function spawnBottle(scene, x , speed, score){
            if(scene.osu == false){
            let bottle = scene.physics.add.sprite(x, gameH - gameH - 100 , scene.bottletexture);
            bottle.setScale(0.1).setGravityY(speed);
            if(scene.inverted == true){
                bottle.setTexture('blackBottle');  
              };

            scene.bottles.push(bottle);
            scene.onScreenBottles += 1;
           
            scene.physics.add.collider(scene.crate , bottle, ()=>{
                if(scene.speed <= 500){
                    scene.catch.play();
                };
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

            if(scene.inverted == true){
                scene.physics.add.collider(scene.crate2 , bottle, ()=>{
                    if(scene.speed <= 500){
                        scene.catch.play();
                    };
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
            };

            scene.physics.add.collider(scene.zone , bottle, ()=>{
                if(scene.strikes <3){
                strike(scene);
                scene.onScreenBottles -= 1;
                bottle.destroy();
                }
            });
        }else{
            let chance = ranInt(100);
            let bottle = {};
            
            if(chance < 50){
                bottle.obj = scene.physics.add.sprite(x, gameH - gameH - 100 , 'beerBottle');
                bottle.type = 'beer';
            }else{
                bottle.obj = scene.physics.add.sprite(x, gameH - gameH - 100 , 'strikeBottle');
                bottle.type = 'strike';
            }
                bottle.obj.setScale(0.1).setGravityY(speed);
                scene.bottles.push(bottle.obj);
                scene.onScreenBottles += 1;


            scene.physics.add.overlap(scene.crate , bottle.obj, ()=>{
                scene.currentbottle = bottle;
                
            });
            
            scene.input.keyboard.on('keyup-Z', ()=>{
          
                    let check = checkOverlap(scene.crate, bottle.obj);
                    if(check == true){
                        if(scene.threshold <= 500){
                            scene.catch.play();
                        };
                        if(scene.currentbottle.type == 'strike'){
                            strike(scene);
                        }
                     
                        scene.onScreenBottles -= 1;
                        bottle.obj.destroy();
                    };
           
                
            }, scene);
            scene.input.keyboard.on('keyup-X', ()=>{

                    let check = checkOverlap(scene.crate, bottle.obj);
                    if(check == true){
                        if(scene.threshold <= 500){
                            scene.catch.play();
                        };
                        if(scene.currentbottle.type == 'strike'){
                            strike(scene);
                        }
                        
                        scene.onScreenBottles -= 1;
                        bottle.obj.destroy();
                    };
      
             
            }, scene);
            
            scene.physics.add.collider(scene.zone , bottle.obj, ()=>{
                if(scene.strikes <3 && bottle.type == 'beer'){
                strike(scene);
                scene.onScreenBottles -= 1;
                bottle.obj.destroy();
                }
            });
        
        };

        };

        // function spawnStrikeBottle(scene, x , speed, score){
        //     let strikeBottle = scene.physics.add.sprite(x, gameH - gameH - 100 , 'strikeBottle');
        //     strikeBottle.setScale(0.1).setGravityY(speed);
        //     scene.bottles.push(strikeBottle);
        //     scene.strikeBottles.push(strikeBottle);
        //     scene.onScreenBottles += 1;
            
        //     // scene.physics.add.collider(scene.crate , strikeBottle, ()=>{
        //     //     if(scene.strikes <3){
        //     //         strike(scene);
        //     //     scene.onScreenBottles -= 1;
        //     //     strikeBottle.destroy();
        //     //     }
        //     // });

        //     scene.input.keyboard.on('keyup-Z', ()=>{
        //         let checkStrike = checkOverlap(scene.crate, strikeBottle);
        //         if(checkStrike == true){
        //             if(scene.delta >= 300){
        //                 scene.catch.play();
        //             };
        //             strike(scene);
        //             scene.onScreenBottles -= 1;
        //             console.log(bottle.texture.key);
        //             strikeBottle.destroy();
        //         };
        //         if(bottle != null){
        //             let check = checkOverlap(scene.crate, bottle);
        //             if(check == true){
        //                 if(scene.delta >= 300){
        //                     scene.catch.play();
        //                 };
                    
        //                 scene.onScreenBottles -= 1;
        //                 console.log(bottle.texture.key);
        //                 bottle.destroy();
        //             };
        //     };

        //     }, scene);
        //     scene.input.keyboard.on('keyup-X', ()=>{
        //         let checkStrike = checkOverlap(scene.crate, strikeBottle);
        //         if(checkStrike == true){
        //             if(scene.delta >= 300){
        //                 scene.catch.play();
        //             };
        //             strike(scene);
        //             scene.onScreenBottles -= 1;
        //             console.log(bottle.texture.key);
        //             strikeBottle.destroy();
        //         };
        //         if(bottle != null){
        //             let check = checkOverlap(scene.crate, bottle);
        //             if(check == true){
        //                 if(scene.delta >= 300){
        //                     scene.catch.play();
        //                 };
                    
        //                 scene.onScreenBottles -= 1;
        //                 console.log(bottle.texture.key);
        //                 bottle.destroy();
        //             };
        //     };
        //     }, scene);

        //     scene.physics.add.collider(scene.zone , strikeBottle, ()=>{
        //         if(scene.strikes <3){
            
        //         scene.onScreenBottles -= 1;
        //         strikeBottle.destroy();
        //         }
        //     });
        // };

        function spawnScalerBottle(scene, x , speed, score){

            if(scene.osu == false){

            let bottle = scene.physics.add.sprite(x, gameH - gameH - 100 , 'scalerBeerBottle');
            bottle.setScale(0.1).setGravityY(speed);
            scene.bottles.push(bottle);
            scene.onScreenBottles += 1;
            scene.physics.add.collider(scene.crate , bottle, ()=>{
                if(scene.threshold <= 500){
                    scene.catch.play();
                };
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

        }else{
            let bottle = {};
            bottle.obj = scene.physics.add.sprite(x, gameH - gameH - 100 , 'scalerBeerBottle');
            bottle.obj.setScale(0.1).setGravityY(speed);
            bottle.type = 'scaler';
            scene.bottles.push(bottle.obj);
            scene.onScreenBottles += 1;
            scene.physics.add.overlap(scene.crate , bottle.obj, ()=>{
                scene.currentbottle = bottle;
                
            });

            scene.input.keyboard.on('keyup-Z', ()=>{
                let check = checkOverlap(scene.crate, bottle.obj);
                if(check == true){
                    if(scene.threshold <= 500){
                        scene.catch.play();
                    };
                    if(scene.currentbottle.type == 'scaler'){
                        scene.crate.setScale(0.5);
                    var scalerEvent = scene.time.delayedCall(5000, ()=>{
                        scene.crate.setScale(0.4);
                    });
                };
                    
                    scene.onScreenBottles -= 1;
                    bottle.obj.destroy();
                };
        }, scene);
        scene.input.keyboard.on('keyup-X', ()=>{
            let check = checkOverlap(scene.crate, bottle.obj);
                if(check == true){
                    if(scene.threshold <= 500){
                        scene.catch.play();
                    };
                    scene.onScreenBottles -= 1;
                    if(scene.currentbottle.type == 'scaler'){
                    scene.crate.setScale(0.5);
                var scalerEvent = scene.time.delayedCall(5000, ()=>{
                    scene.crate.setScale(0.4);
                });
            };
                bottle.obj.destroy();
                };
        }, scene);
            scene.physics.add.collider(scene.zone , bottle.obj, ()=>{
                if(scene.strikes <3){
                strike(scene);
                scene.onScreenBottles -= 1;
                bottle.obj.destroy();
                }
            });
        };
            
        };
        

        function spawnTimeBottle(scene, x , speed, score){

            if(scene.osu == false){
            let bottle = scene.physics.add.sprite(x, gameH - gameH - 100 , 'timerBeerBottle');
            bottle.setScale(0.1).setGravityY(speed);
            bottle.type = 'timer';
            scene.bottles.push(bottle);
            scene.onScreenBottles += 1;

            scene.physics.add.collider(scene.crate , bottle, ()=>{
                if(scene.threshold <= 500){
                    scene.catch.play();
                };
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
                scene.delta += 120;
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
        }else{
            let bottle = {};
            bottle.obj = scene.physics.add.sprite(x, gameH - gameH - 100 , 'timerBeerBottle');
            bottle.obj.setScale(0.1).setGravityY(speed);
            scene.bottles.push(bottle.obj);
            scene.onScreenBottles += 1;

            scene.physics.add.overlap(scene.crate , bottle.obj, ()=>{
                scene.currentbottle = bottle;
                
            });

            scene.input.keyboard.on('keyup-Z', ()=>{
                let check = checkOverlap(scene.crate, bottle.obj);
                if(check == true){
                    if(scene.threshold <= 500){
                        scene.catch.play();
                    };
                    scene.onScreenBottles -= 1;
                    if(scene.currentbottle.type == 'timer'){
                    scene.delta += 120;
                    };
                    bottle.obj.destroy();
                };
        }, scene);
        scene.input.keyboard.on('keyup-X', ()=>{
            let check = checkOverlap(scene.crate, bottle.obj);
                if(check == true){
                    if(scene.threshold <= 500){
                        scene.catch.play();
                    };
                    scene.onScreenBottles -= 1;
                    if(scene.currentbottle.type == 'timer'){
                        scene.delta += 120;
                        };
                    bottle.obj.destroy();
                };
        }, scene);
            
        scene.physics.add.collider(scene.zone , bottle.obj, ()=>{
            if(scene.strikes <3){
            strike(scene);
            scene.onScreenBottles -= 1;
            bottle.obj.destroy();
            }
        });
        
        };
          
        };
    
        function spawnClearBottle(scene, x , speed, score){
        

            if(scene.osu == false){
                let bottle = scene.physics.add.sprite(x, gameH - gameH - 100 , 'clearBeerBottle');
                bottle.setScale(0.1).setGravityY(speed);
                // scene.onScreenBottles += 1;
                scene.bottles.push(bottle);

            scene.physics.add.collider(scene.crate , bottle, ()=>{
                if(scene.threshold <= 500){
                    scene.catch.play();
                };
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
            scene.physics.add.collider(scene.zone , bottle, ()=>{
                if(scene.strikes <3){
                strike(scene);
                scene.onScreenBottles -= 1;
                bottle.destroy();
                }
            });

            console.log(scene.onScreenBottles);
        }else{

            let bottle = {};
            bottle.obj = scene.physics.add.sprite(x, gameH - gameH - 100 , 'clearBeerBottle');
            bottle.obj.setScale(0.1).setGravityY(speed);
            bottle.type = 'clear';
            // scene.onScreenBottles += 1;
            scene.bottles.push(bottle.obj);

            scene.physics.add.overlap(scene.crate , bottle.obj, ()=>{
                scene.currentbottle = bottle;
                
            });

            scene.input.keyboard.on('keyup-Z', ()=>{
                let check = checkOverlap(scene.crate, bottle.obj);
                if(check == true){
                    if(scene.threshold <= 500){
                        scene.catch.play();
                    };
                    scene.onScreenBottles -= 1;
                    if(scene.currentbottle.type == 'clear'){
                    for (let index = 0; index < scene.bottles.length; index++) {
                        const element = scene.bottles[index];
                        element.destroy();
                   
                    }};
                    bottle.obj.destroy();
                };
        }, scene);
        scene.input.keyboard.on('keyup-X', ()=>{
            let check = checkOverlap(scene.crate, bottle.obj);
                if(check == true){
                    if(scene.threshold <= 500){
                        scene.catch.play();
                    };
                    scene.onScreenBottles -= 1;
                    if(scene.currentbottle.type == 'clear'){
                        for (let index = 0; index < scene.bottles.length; index++) {
                            const element = scene.bottles[index];
                            element.destroy();
                       
                        }};
                    bottle.obj.destroy();
                };
        }, scene);

   
        scene.physics.add.collider(scene.zone , bottle.obj, ()=>{
            if(scene.strikes <3){
            strike(scene);
            scene.onScreenBottles -= 1;
            bottle.obj.destroy();
            }
        });
        };
    };
     
  

        var diff = time - this.lastBeerTime;
        if (diff > this.delta && this.strikes < 3 && this.ready == true) {
          this.lastBeerTime = time;
          if (this.delta > this.threshold) {
            this.delta -= 20 + this.speedBuff;
          }
          var pos = (this.table.x - this.table.width/2) + ranInt(this.table.width);
          let chance = Math.floor(Math.random() * 1000);
          if(this.difficulty == 'doom'){
            spawnBottle(this, pos , this.speed, this.bottleScore);
          }else{
          if(this.osu == false){
            if(chance <= 5){
            spawnClearBottle(this, pos , this.speed, this.bottleScore);
          }else if(chance <= 10){
            spawnTimeBottle(this, pos , this.speed, this.bottleScore);
          }else if(chance <= 20){
            spawnScalerBottle(this, pos , this.speed, this.bottleScore);
          }else{
            spawnBottle(this, pos , this.speed, this.bottleScore); 
          }
        }else{
            if(chance <= 5){
                spawnClearBottle(this, pos , this.speed, this.bottleScore);
              }else if(chance <= 10){
                spawnTimeBottle(this, pos , this.speed, this.bottleScore);
              }else if(chance <= 20){
                spawnScalerBottle(this, pos , this.speed, this.bottleScore);
              }else{
                spawnBottle(this, pos , this.speed, this.bottleScore); 
              };
              this.bottlesSpawned += 1;
              
        };
        };
    };
    // if(this.sw1 = true){
    //   spawnBottle(this, gameW/2 , this.speed, this.bottleScore);
    //   this.sw1 = false;
    // };
        
        if(this.over == false){
        this.table.setInteractive().on('pointerover', ()=>{
            this.switch = true;
        }).on('pointerout', ()=>{
            this.switch = false;
        });
    };

        if(this.difficulty == 'hard' || this.difficulty == 'doom'){
            this.crate.x = game.input.mousePointer.x;
            if(this.switch == true){
                this.crate.setVisible(true);
            }else{
                this.crate.setVisible(false);
            }


       
    }else{
        if(this.switch == true){
            this.crate.x = game.input.mousePointer.x;
        };
    }
        if(this.osu != true && this.difficulty != 'doom'){
        if(this.tween != null && this.over == false){
            this.scoreNumber.setText(Math.trunc(this.tween.getValue()));
        }
    }else if(this.osu == true && this.difficulty != 'doom' && this.over == false){
        
            this.osuScore = this.bottlesLeft - this.bottlesSpawned;
            this.scoreNumber.setText(this.osuScore);
        };
        
        if(this.difficulty == 'easy'){
            if(this.osu == true){
                this.bottlesLeft = 300;

                if(this.bottlesSpawned < 100){
                    this.img1.setVisible(true);
                    this.shadow.setVisible(true);
                    this.speed = 150;
                    this.timeToSpawn = 2000;
                  
                   
                    
                }else if(this.bottlesSpawned < 200){
                    this.img1.destroy()
                    this.img2.setVisible(true);
                    this.shadow.setVisible(false);
                    this.shadow2.setVisible(true);
                    this.speed = 250;
                    this.timeToSpawn = 1800;
                   
               
                    if (this.sw1 == true ){
                        cheer(this);
                    };
                    this.sw1 = false;
                }else if(this.bottlesSpawned < 300){
                    this.img2.destroy()
                    this.img3.setVisible(true);
                    this.shadow2.setVisible(false);
                    this.shadow3.setVisible(true);
                    this.speed = 350;
                    this.timeToSpawn = 1600;
                    this.bottleScore = 10;
              
                    if (this.sw2 == true ){
                        cheer(this);
                    };
                    this.sw2 = false;
                }
        }else{
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
                this.shadow3.setVisible(true);
                this.speed = 350;
                this.timeToSpawn = 1600;
                this.bottleScore = 10;
          
                if (this.sw2 == true ){
                    cheer(this);
                };
                this.sw2 = false;
            }
        };
      };
        if(this.difficulty == 'normal'){
            
            if(this.osu == true){
                
                this.bottlesLeft = 500;
                if(this.bottlesSpawned < 100){
               
                    this.img1.setVisible(true);
                    this.shadow.setVisible(true);
                    this.speed = 200;
                    this.threshold = 500;
            
                
                }else if(this.bottlesSpawned < 200){
                    this.img1.setVisible(false);
                    this.img2.setVisible(true);
                    this.shadow.setVisible(false);
                    this.shadow2.setVisible(true);
                    this.speed = 300;
                    this.threshold = 400;
                  
                    if (this.sw1 == true ){
                        cheer(this);
                    };
                    this.sw1 = false;
                }else if(this.bottlesSpawned < 300){
                    this.threshold = 400;
                    this.img2.setVisible(false);
                    this.img3.setVisible(true);
                    this.shadow2.setVisible(false);
                    this.shadow3.setVisible(true);
                    this.speed = 350;
                
                    if (this.sw2 == true ){
                        cheer(this);
                    };
                    this.sw2 = false;
                }else if(this.bottlesSpawned < 400){
                    this.img3.setVisible(false);
                    this.img4.setVisible(true);
                    this.shadow3.setVisible(false);
                    this.shadow4.setVisible(true);
                    
                    this.speed = 500;
                    this.threshold = 350;
                 
                    if (this.sw3 == true ){
                        cheer(this);
                    };
                    this.sw3 = false;
                }else if(this.bottlesSpawned < 500){
    
                    this.speed = 600;
                    this.threshold = 300;
                  
                }
            }else{
            this.target = 5000;
            
            
    
            
            if(this.score < 1000  || this.osuScore <= 500){
                this.img1.setVisible(true);
                this.shadow.setVisible(true);
                this.speed = 200;
                this.threshold = 500;
                this.bottleScore = 10;
            
            }else if(this.osuScore <= 400 || this.score < 2000 ){
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
            }else if(this.score < 3000|| this.osuScore <=300){
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
            }else if(this.score < 4000 || this.osuScore <=200){
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
            }else if(this.score < 5000 || this.osuScore <=100){

                this.speed = 600;
                this.threshold = 300;
                this.bottleScore = 10;
            }
        };
            };
            
        // if (this.osuScore < 400){
        //     cheer(this);
        // }
        if(this.difficulty == 'hard'){
            if(this.osu == true){
                this.bottlesLeft = 600;
                if(this.bottlesSpawned < 100){
                    this.img1.setVisible(true);
                    this.shadow.setVisible(true);
                    this.speed = 200;
                    this.threshold = 400;
          
                 
                }else if(this.bottlesSpawned < 200){
                    this.img1.setVisible(false);
                    this.img2.setVisible(true);
                    this.shadow.setVisible(false);
                    this.shadow2.setVisible(true);
                    this.speed = 350;
                    this.threshold = 400;
        
                    if (this.sw1 == true ){
                        cheer(this);
                    };
                    this.sw1 = false;
                }else if(this.bottlesSpawned < 300){
                    this.img2.setVisible(false);
                    this.img3.setVisible(true);
                    this.shadow2.setVisible(false);
                    this.shadow3.setVisible(true);
                    this.speed = 500;
                    this.threshold = 350;
                
                    if (this.sw2 == true ){
                        cheer(this);
                    };
                    this.sw2 = false;
                }else if(this.bottlesSpawned < 400){
                    this.img3.setVisible(false);
                    this.img4.setVisible(true);
                    this.shadow3.setVisible(false);
                    this.shadow4.setVisible(true);
                    this.speed = 600;
                    this.threshold = 300;
               
                    if (this.sw3 == true ){
                        cheer(this);
                    };
                    this.sw3 = false;
                }else if(this.bottlesSpawned < 500){
                    
                    this.img4.setVisible(false);
                    this.img5.setVisible(true);
                    this.shadow4.setVisible(false);
                    this.shadow5.setVisible(true);
              
                    this.speed = 600;
                    this.threshold = 250;
                 
                    if (this.sw4 == true ){
                        cheer(this);
                    };
                    this.sw4 = false;
                }else if(this.bottlesSpawned < 600){

                    this.img5.setVisible(false);
                    this.img6.setVisible(true);
                    this.shadow5.setVisible(false);
                    this.shadow6.setVisible(true);
              
                
                    this.speed = 700;
                    this.threshold = 250;
              
                    if (this.sw5 == true ){
                        cheer(this);
                    };
                    this.sw5 = false;
                   
                }
            }else{
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
                
                this.img4.setVisible(false);
                this.img5.setVisible(true);
                this.shadow4.setVisible(false);
                this.shadow5.setVisible(true);
          
                this.speed = 600;
                this.threshold = 250;
                this.bottleScore = 10;
                if (this.sw4 == true ){
                    cheer(this);
                };
                this.sw4 = false;
            }else if(this.score < 6000){

                this.img5.setVisible(false);
                this.img6.setVisible(true);
                this.shadow5.setVisible(false);
                this.shadow6.setVisible(true);

                this.speed = 700;
                this.threshold = 250;
                this.bottleScore = 10;
               
                if (this.sw5 == true ){
                    cheer(this);
                };
                this.sw5 = false;

            }
        };
            };

            
            

        if(this.over == false && this.difficulty == 'doom'){
            this.music.resume();
        };

        if(this.strikes >= 3 && this.over == false && this.difficulty=='doom'){
            this.music.pause();
            let card = this.add.sprite(gameW/2, gameH/2 , 'card').setDepth(4).setScale(2);
            this.cardText = this.add.text(gameW/2, gameH/2, "You lost. But it's fine , just try again!", { font: "bold 55px Arial", fill: "#FAD02C", stroke: '#000000', strokeThickness: 5 }).setDepth(6).setOrigin(0.5, 0.5);
            if (this.sw6 == true ){
                this.gameover.play();
            };
            this.sw6 = false;
            this.return = this.add.sprite(gameW/2, gameH * 0.8, 'return').setDepth(6).setScale(0.7).setFrame(0).setInteractive().on('pointerover', function(){
                this.setFrame(1);
            }).on('pointerdown', function(event){
            
                this.return.setFrame(1);
                this.buttonClick.play();
                this.table.setInteractive(false);
    
                this.ready = false;
                this.over = true;
                this.switch = false;
                    distruge(this.pole1);
                    distruge(this.pole2);
                    distruge(this.table);
                    distruge(this.background);
        

                var timedEvent = this.time.delayedCall(1500, ()=>{
                    
                    // this.win.destroy();
                    // this.shadow6.destroy();



                        
                        this.textures.remove('table');
                        this.textures.remove('pole');
                      
                    
                    this.cache.audio.remove('music');
                    // this.cache.video.remove('poltergeist');
                    // this.cache.video.remove('animedoom');
                
               
                    // this.scene.restart('Menu');
                    
                    let info = [this.sfxClick, this.musicClick, true];
                    console.log(info);
                    this.score = 0;
            this.bottlesSpawned = 0;
            this.osuScore = 0;
            distruge(this.scoreNumber);
            distruge(this.scoreTitle);
                    this.scene.start('Menu', info);
                   
            } , [], this);
    
            }, this).on('pointerup', function(){
                this.setFrame(0);
                
            }).on('pointerout', function(){
    
                this.setFrame(0);
            });

        };

        if(this.difficulty != 'doom'){
            if(this.score >= this.target || this.strikes >= 3 || this.osuScore <= 0){
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
                if(this.score >= this.target || this.osuScore <= 0 && this.difficulty != 'doom'){
                    
                    this.win.setVisible(true).setDepth(5);
                    if (this.sw6 == true ){
                        this.winSound.play();
                    };
                    this.sw6 = false;
                    if(this.difficulty != 'easy' && this.mode != 'anime'){
                        this.shadow7.setVisible(true).setDepth(5);
                    };
                    this.cardText = this.add.text(gameW/2, gameH/2 + 200, 'Congratulations!', { font: "bold 40px Arial", fill: "#7CF3A0", stroke: '#000000', strokeThickness: 5 }).setDepth(6).setOrigin(0.5, 0.5);

            }else{
                    this.cardText = this.add.text(gameW/2, gameH/2, "You lost. But it's fine , just try again!", { font: "bold 55px Arial", fill: "#FAD02C", stroke: '#000000', strokeThickness: 5 }).setDepth(6).setOrigin(0.5, 0.5);
                    if (this.sw6 == true ){
                        this.gameover.play();
                    };
                    this.sw6 = false;
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
                    distruge(this.shadow7);
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
                            this.textures.remove('7');
                        }else if(this.mode == 'anime' && this.difficulty == 'hard'){
                            this.textures.remove('1');
                            this.textures.remove('2');
                            this.textures.remove('3');
                            this.textures.remove('4');;
                            this.textures.remove('5');
                            this.textures.remove('6');
                        }
                        // this.scene.restart('Menu');
                        
                        let info = [this.sfxClick, this.musicClick, true];
                        console.log(info);
                        this.score = 0;
                this.bottlesSpawned = 0;
                this.osuScore = 0;
                this.scoreNumber.setText('0');
                this.scoreNumber.destroy();
                this.scoreTitle.destroy();
                        this.scene.start('Menu', info);
                        this.return.destroy();
                } , [], this);
        
                }, this).on('pointerup', function(){
                    this.setFrame(0);
                    
                }).on('pointerout', function(){
        
                    this.setFrame(0);
                });
            };
    };
};
    };

   


   