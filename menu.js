import Phaser from 'phaser';
import Play from './play';


class Menu extends Phaser.Scene{
    constructor(){
       super({ key: 'Menu' });
       this.state = {};
   };

   init(info){
       console.log('game phase')

       this.initSFX = info[0];
       this.initMusic = info[1];
       if(info[3] == true){
           this.scene.stop('Play');
       }
   };


    preload(){
        this.load.image('bg', 'assets/barcounter.jpg');
        this.load.image('machine', 'assets/machine.png');
        this.load.spritesheet("osu", "assets/osu.png",{ frameWidth: 945, frameHeight: 945 });
        this.load.spritesheet("default", "assets/defaultbutton.png",{ frameWidth: 200, frameHeight: 157 });
        this.load.spritesheet("anime", "assets/animebutton.png",{ frameWidth: 200, frameHeight: 157 });
        this.load.spritesheet("start", "assets/startbutton.png",{ frameWidth: 200, frameHeight: 157 });
        this.load.spritesheet("easy", "assets/easybutton.png",{ frameWidth: 500, frameHeight: 431 });
        this.load.spritesheet("normal", "assets/normalbutton.png",{ frameWidth: 500, frameHeight: 431 });
        this.load.spritesheet("hard", "assets/hardbutton.png",{ frameWidth: 500, frameHeight: 431 });
        this.load.spritesheet("sfx", "assets/sfxButton.png",{ frameWidth: 200, frameHeight: 200 });
        this.load.spritesheet("musicButton", "assets/musicButton.png",{ frameWidth: 200, frameHeight: 200 });
        this.load.audio('buttonClick', 'assets/audio/buttonclick.mp3'); 

   };

    create(){
        let gameW = this.sys.game.config.width;
        let gameH = this.sys.game.config.height;
    
        
    

        this.osu = false;



        let background = this.add.sprite(0, 0 , 'bg');
        background.setPosition(gameW/2, gameH/2).setDisplaySize(gameW, gameH);
        let machine = this.add.sprite(gameW/2,gameH/2.2 , 'machine').setScale(1.9);

        this.buttonClick = this.sound.add('buttonClick');
        var mode = 'default';
        var difficulty = 'normal';
        this.pausetext = this.add.text(gameW * 0.02, gameH*0.7, "PRESS 'P' TO PAUSE", { font: "bold 25px Arial", fill: "#ffffff", stroke: '#000000', strokeThickness: 5 });
        this.mutemusictext = this.add.text(gameW * 0.02, gameH*0.8, "PRESS 'M' TO STOP MUSIC", { font: "bold 25px Arial", fill: "#ffffff", stroke: '#000000', strokeThickness: 5 });
        this.mutesfxtext = this.add.text(gameW * 0.02, gameH*0.9, "PRESS 'N' TO MUTE SOUND EFFECTS", { font: "bold 25px Arial", fill: "#ffffff", stroke: '#000000', strokeThickness: 5 });
        this.osutext = this.add.text(gameW * 0.77, gameH/3.8, "PRESS 'Z' OR 'X' KEYS \n TO CATCH THE BEER", { font: "bold 25px Arial", fill: "#ffffff", stroke: '#000000', strokeThickness: 5 });
        this.osutext.setVisible(false);
        const osuLogo = this.add.sprite(gameW/ 1.45, gameH/3.5, 'osu').setFrame(1).setScale(0.15).setInteractive().on('pointerover', function(){
            
        }).on('pointerdown', function(event){
            if(this.buttonClick != null){
                this.buttonClick.play();
            };
            if(this.osu == false){
                osuLogo.setFrame(0);
                this.osutext.setVisible(true);
                this.osu = true;
            }else{
                osuLogo.setFrame(1);
                this.osutext.setVisible(false);
                this.osu = false;
            }
    
            
        }, this).on('pointerup', function(){
            
        }).on('pointerout', function(){
            
        });



        this.im
        
        var sfxClick = false;
        var musicClick = false;
        this.sfxButton = this.add.sprite(gameW/ 1.45, gameH/1.5, 'sfx').setFrame(0).setScale(0.7).setInteractive().on('pointerover', function(){
            
        }).on('pointerdown', function(event){
            
            if(sfxClick == false){
                this.sfxButton.setFrame(1);
                this.buttonClick.setMute(true);
                sfxClick = true;
            }else{
                this.sfxButton.setFrame(0);
                this.buttonClick.setMute(false);
                sfxClick = false;
            }
    
            
        }, this).on('pointerup', function(){
            
        }).on('pointerout', function(){
            
        });

        this.input.keyboard.on('keydown-N', ()=>{

            if(sfxClick == false){
                this.sfxButton.setFrame(1);
                this.buttonClick.setMute(true);
                sfxClick = true;
            }else{
                this.sfxButton.setFrame(0);
                this.buttonClick.setMute(false);
                sfxClick = false;
            }
        }, this);

        this.musicButton = this.add.sprite(gameW/ 1.45, gameH/2.1, 'musicButton').setFrame(0).setScale(0.7).setInteractive().on('pointerover', function(){
            
        }).on('pointerdown', function(event){
            if(musicClick == false){
                this.musicButton.setFrame(1);
                // this.lobbymusic.setMute(true);
                musicClick = true;
            }else{
                this.musicButton.setFrame(0);
                // this.lobbymusic.setMute(false);
                musicClick = false;
            }
            
        }, this).on('pointerup', function(){
            
        }).on('pointerout', function(){
            
        });

        this.input.keyboard.on('keydown-M', ()=>{

            if(musicClick == false){
                this.musicButton.setFrame(1);
                // this.lobbymusic.setMute(true);
                musicClick = true;
            }else{
                this.musicButton.setFrame(0);
                // this.lobbymusic.setMute(false);
                musicClick = false;
            }

        }, this);

        console.log(this.initMusic, this.initSFX);

        if(this.initSFX == true){
            this.sfxButton.setFrame(1);
            sfxClick = true;
            this.buttonClick.setMute(true);
     
            this.musicButton.setFrame(1);
            musicClick = true;
            // this.lobbymusic.setMute(this.initMusic);
        };
        



        this.default = this.add.sprite(gameW/2.2, gameH * 0.10, 'default').setScale(0.7).setInteractive().on('pointerover', function(){
            this.setFrame(0);
        }).on('pointerdown', function(event){
            this.default.setFrame(0);
            if(this.anime != null){
                this.anime.setFrame(1);
            }
            mode = 'default';
            if(this.buttonClick != null){
                this.buttonClick.play();
            };
            
            if(difficulty == 'easy'){
                this.easy.setFrame(0);
            }else{
                this.easy.setFrame(1);
            };

            if(difficulty == 'normal'){
                this.normal.setFrame(0);
            }else{
                this.normal.setFrame(1);
            };

            if(difficulty == 'hard'){
                this.hard.setFrame(0);
            }else{
                this.hard.setFrame(1);
            };

            console.log(mode);
        }, this).on('pointerup', function(){
            this.setFrame(0);
            if(this.buttonClick != null){
                this.buttonClick.play();
            };
        }).on('pointerout', function(){
            if(mode != 'default'){
                this.setFrame(1);
            }
        });

        this.anime = this.add.sprite(gameW/1.8, gameH * 0.10, 'anime').setScale(0.7).setFrame(1).setInteractive().on('pointerover', function(){
            this.setFrame(0);
        }).on('pointerdown', function(event){
            this.anime.setFrame(0);
            this.default.setFrame(1);
            mode = 'anime';
            if(this.buttonClick != null){
                this.buttonClick.play();
            };
            if(difficulty == 'easy'){
                this.easy.setFrame(2);
            }else{
                this.easy.setFrame(3);
            };

            if(difficulty == 'normal'){
                this.normal.setFrame(2);
            }else{
                this.normal.setFrame(3);
            };

            if(difficulty == 'hard'){
                this.hard.setFrame(2);
            }else{
                this.hard.setFrame(3);
            };

            console.log(mode);
        }, this).on('pointerup', function(){
            this.setFrame(0);
            if(this.buttonClick != null){
                this.buttonClick.play();
            };
        }).on('pointerout', function(){
            if(mode != 'anime'){
                this.setFrame(1);
            }
        });

        this.easy = this.add.sprite(gameW/2.5, gameH*0.3, 'easy').setScale(0.3).setInteractive().on('pointerover', function(){
            if(mode == 'default'){
                this.setFrame(0);
            }else{
                this.setFrame(2);
            };
            
        }).on('pointerdown', function(event){
            if(mode == 'default'){
                this.easy.setFrame(0);
            }else{
                this.easy.setFrame(2);
            };
            if(this.buttonClick != null){
                this.buttonClick.play();
            };
            // if(this.anime != null){
            //     this.anime.setFrame(1);
            // }
            difficulty = 'easy';

            if(mode == 'default'){
                this.normal.setFrame(1);
            }else{
                this.normal.setFrame(3);
            };

            if(mode == 'default'){
                this.hard.setFrame(1);
            }else{
                this.hard.setFrame(3);
            };

            console.log(difficulty);
        }, this).on('pointerup', function(){
            if(this.buttonClick != null){
                this.buttonClick.play();
            };
            if(mode == 'default'){
                this.setFrame(0);
            }else{
                this.setFrame(2);
            };
        }).on('pointerout', function(){
            if(difficulty != 'easy'){
                if(mode == 'default'){
                    this.setFrame(1);
                }else{
                    this.setFrame(3);
                };
            }
        });

        if(mode == 'default'){
            this.easy.setFrame(1);
        }else{
            this.easy.setFrame(3);
        };

        this.normal = this.add.sprite(gameW/2, gameH*0.3, 'normal').setScale(0.3).setInteractive().on('pointerover', function(){
            if(mode == 'default'){
                this.setFrame(0);
            }else{
                this.setFrame(2);
            };
            
        }).on('pointerdown', function(event){
            if(this.buttonClick != null){
                this.buttonClick.play();
            };
            if(mode == 'default'){
                this.normal.setFrame(0);
            }else{
                this.normal.setFrame(2);
            };
            if(mode == 'default'){
                this.easy.setFrame(1);
            }else{
                this.easy.setFrame(3);
            };

            if(mode == 'default'){
                this.hard.setFrame(1);
            }else{
                this.hard.setFrame(3);
            };

            difficulty = 'normal';
            console.log(difficulty);
        }, this).on('pointerup', function(){
            if(this.buttonClick != null){
                this.buttonClick.play();
            };
            if(mode == 'default'){
                this.setFrame(0);
            }else{
                this.setFrame(2);
            };
        }).on('pointerout', function(){
            if(difficulty != 'normal'){
                if(mode == 'default'){
                    this.setFrame(1);
                }else{
                    this.setFrame(3);
                };
            }
        });

        if(mode == 'default'){
            this.normal.setFrame(0);
        }else{
            this.normal.setFrame(2);
        };

        this.hard = this.add.sprite(gameW/ 1.665, gameH*0.3, 'hard').setScale(0.3).setInteractive().on('pointerover', function(){
            if(mode == 'default'){
                this.setFrame(0);
            }else{
                this.setFrame(2);
            };
            
        }).on('pointerdown', function(event){
            if(this.buttonClick != null){
                this.buttonClick.play();
            };
            if(mode == 'default'){
                this.hard.setFrame(0);
            }else{
                this.hard.setFrame(2);
            };
            // if(this.anime != null){
            //     this.anime.setFrame(1);
            // }
            difficulty = 'hard';

            if(mode == 'default'){
                this.normal.setFrame(1);
            }else{
                this.normal.setFrame(3);
            };

            if(mode == 'default'){
                this.easy.setFrame(1);
            }else{
                this.easy.setFrame(3);
            };

            console.log(difficulty);
        }, this).on('pointerup', function(){
            if(this.buttonClick != null){
                this.buttonClick.play();
            };
            if(mode == 'default'){
                this.setFrame(0);
            }else{
                this.setFrame(2);
            };
        }).on('pointerout', function(){
            if(difficulty != 'hard'){
                if(mode == 'default'){
                    this.setFrame(1);
                }else{
                    this.setFrame(3);
                };
            }
        });

        if(mode == 'default'){
            this.hard.setFrame(1);
        }else{
            this.hard.setFrame(3);
        };

        this.start = this.add.sprite(gameW/2, gameH * 0.9, 'start').setScale(0.7).setFrame(0).setInteractive().on('pointerover', function(){
            this.setFrame(1);
        }).on('pointerdown', function(event){
            this.start.setFrame(1);
           
            // this.cache.audio.remove('lobby');
            if(this.buttonClick != null){
                this.buttonClick.play();
            };
     
            let info = [mode,  difficulty, sfxClick, musicClick, this.osu];
            var timedEvent = this.time.delayedCall(1500, ()=>{
                
                this.scene.restart('Play');
                
                this.scene.start('Play', info);
                // Play.textures.remove('board');
        } , [], this);

        }, this).on('pointerup', function(){
            this.setFrame(0);
        }).on('pointerout', function(){

            this.setFrame(0);
        });

        
   };

   update(){

       
   };
};


var Pause = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Pause ()
    {
        Phaser.Scene.call(this, { key: 'Pause' });
    },

    preload: function ()
    {
        
    },

    create: function ()
    {
        let gameW = this.sys.game.config.width;
        let gameH = this.sys.game.config.height;
        
        this.pause = this.add.text(gameW/2, gameH/2.3, 'GAME IS PAUSED', { font: "bold 70px Arial", fill: "#ffffff", stroke: '#000000', strokeThickness: 5 }).setOrigin(0.5, 0.5);
        this.pause2 = this.add.text(gameW/2, gameH/1.8, "PRESS 'P' TO RESUME", { font: "bold 70px Arial", fill: "#ffffff", stroke: '#000000', strokeThickness: 5 }).setOrigin(0.5, 0.5);

        this.input.keyboard.on('keydown-P', ()=>{

            this.scene.stop('Pause');
            this.scene.resume('Play');

        }, this);
    }

});

var Check = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Pause ()
    {
        Phaser.Scene.call(this, { key: 'Check' });
    },

    preload: function ()
    {
        
    },

    create: function ()
    {
        let gameW = this.sys.game.config.width;
        let gameH = this.sys.game.config.height;
        
        var timedEvent = this.time.delayedCall(4000, ()=>{
            this.scene.stop('Check');
            this.scene.resume('Play');
        });
                        
        this.input.keyboard.on('keydown-SPACE', ()=>{

            this.scene.stop('Check');
            this.scene.resume('Play');

        }, this);
    }

});



let config = {
    type: Phaser.AUTO,
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    scene: [ Menu, Play, Pause, Check],
    scale: {
        mode: Phaser.Scale.FIT,
    },
    parent:'phaser-container',
	dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0,
                        x:0 },
            debug: false
        }
    }
};


// create a new game , pass the configuration

let game = new Phaser.Game(config); 

export default game;