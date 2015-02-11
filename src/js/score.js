(function() {
  'use strict';

  function Score() {
    this.scoreText = null;
  }

  Score.prototype = {

    create: function () {
      this.points = window['shoot'].score;
      this.addScoreText();
    },

    addScoreText: function () {
      this.scoreText = this.add.text(
        this.game.width / 2,
        this.game.height / 2,
        " Partie terminé \n Votre score : " + this.points + " points \n Cliquer ici pour recommencer ",
        {font: "36px Arial", fill: '#123456', align: 'center' } // style du texte
      );
      this.scoreText.anchor.setTo(0.5, 0.5); // permet de centrer l'élément
      this.scoreText.inputEnabled = true; // autorise evenements
      this.scoreText.events.onInputDown.add(this.onDown, this);// ajout d'un evenement onmousedown pour demarrer le jeu
    },

    onDown: function () {
      this.game.state.start('game');//demarrage du jeu
    }
  };

  window['shoot'] = window['shoot'] || {};
  window['shoot'].Score = Score;

}());
