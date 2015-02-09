(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {

    preload: function () {
      // on affiche le preloader
      this.asset = this.add.sprite(320, 240, 'preloader');
      this.asset.anchor.setTo(0.5, 0.5);
      // on charge tous les assets
      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);
      this.load.image('ballon', 'assets/ballon.png');
    },
    create: function () {
      this.asset.cropEnabled = false;
    },
    update: function () {
      if (!!this.ready) {// ici on verifie a chaque frame si le prechargement est terminé
        this.game.state.start('menu');// si ready, aller à la prochaine étape : le menu
      }
    },
    onLoadComplete: function () {
      this.ready = true;// chargement terminé
    }
  };
  window['shoot'] = window['shoot'] || {};
  window['shoot'].Preloader = Preloader;
}());
