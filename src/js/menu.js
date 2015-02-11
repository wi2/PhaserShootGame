(function() {
  'use strict';

  function Menu() {
    this.startText = null;
  }

  Menu.prototype = {

    create: function () {
      this.addText();
    },

    addText: function () {
      this.startText = this.add.text(
        this.game.width / 2,
        this.game.height / 2,
        " Shoot Balloon Game \n Click to START ",
        {font: "36px Arial", fill: '#123456', align: 'center' } // style du texte
      );
      this.startText.anchor.setTo(0.5, 0.5); // permet de centrer l'élément
      this.startText.inputEnabled = true; // autorise evenements
      this.startText.events.onInputDown.add(this.onDown, this);// ajout d'un evenement onmousedown pour demarrer le jeu
    },

    onDown: function () {
      console.log("game > menu");
      this.game.state.start('game');//demarrage du jeu
    }
  };

  window['shoot'] = window['shoot'] || {};
  window['shoot'].Menu = Menu;

}());
