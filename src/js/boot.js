(function () {
  'use strict';

  function Boot() {}

  Boot.prototype = {

    preload: function () {
      this.load.image('preloader', 'assets/preloader.gif'); // on precharge l'image du loader
    },

    create: function () {
      //initialisation du jeu
      this.game.stage.backgroundColor = '#ffffff';
      this.game.input.maxPointers = 1;
      if (this.game.device.desktop) {
        this.game.scale.pageAlignHorizontally = true;
      } else {
        this.game.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.minWidth =  480;
        this.game.scale.minHeight = 260;
        this.game.scale.maxWidth = 640;
        this.game.scale.maxHeight = 480;
        this.game.scale.forceLandscape = true;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.setScreenSize(true);
      }
      this.game.state.start('preloader');// on lance l'étape preloader pour charger les assets du jeu
    }
  };

  window['shoot'] = window['shoot'] || {};
  window['shoot'].Boot = Boot;

}());

