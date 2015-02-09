(function() {
  'use strict';

  function Game() {
    this.targets = null;
    this.nb = null;
    this.points = null;
    this.scoreText = null;
  }

  Game.prototype = {

    create: function () {
      this.targets = [];// on initialise de le tableau qui vont repertorier les objets à shooter
      this.nb = 0;
      this.points = 0;
      this.scoreText = this.add.text(
        this.game.width - 150,
        20,
        "",
        {font: "16px Arial", fill: '#FF00FF', align: 'right' } // style du texte
      );
      this.renderPoint(); // on montre les points
      this.scoreText.anchor.setTo(0.5, 0.5); // permet de centrer l'élément
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.gravity.y = -300;// global gravity
    },
    update: function () {
      this.nb++;
      if (this.nb % 50 === 0) {// toutes les 50 images
        if (this.targets.length < 5) //on ajoute un nouveau shoot seulement si il y en moins que 5
          this.addTarget();
      } else {
        for (var i=0; i<this.targets.length; i++) {
          if (this.targets[i].y < -100)
            this.removeTarget(i);
        }
      }
      if (this.nb > 1000)
        this.next();
    },
    addTarget: function () {
      var that = this;
      var x = this.game.rnd.integerInRange(20, this.game.width - 20)
        , y = this.game.rnd.integerInRange(this.game.height+50, this.game.height+250)
        , target = null;
      // positionnement du ballon au centre de l'écran
      target = this.add.sprite(x, y, 'ballon');
      target.anchor.setTo(0.5, 0.5);
      //
      target.inputEnabled = true;
      this.game.physics.enable( [target], Phaser.Physics.ARCADE);// on autorise les targets
      target.body.gravity.x = this.game.rnd.integerInRange(-50, 50);
      target.events.onInputDown.add(function(){
        for(var i=0;i < that.targets.length; i++) {
          if (that.targets[i] === target) {
            that.removeTarget(i);
            that.points++;
            that.renderPoint();
          }

        }
      }, target); // event: onmousedown
      this.targets.push(target);
    },
    removeTarget: function (i) {
      this.targets[i].kill();
      this.targets.splice(i,1);
    },
    next: function () {
      window['shoot'].score = this.points;
      this.game.state.start('score');//on envoie a l'étape suivante : l'affichage du score
    },
    renderPoint: function () {
      this.scoreText.text = this.points + " point" + ((this.points>1) ? "s" : "");
    }
  };
  window['shoot'] = window['shoot'] || {};
  window['shoot'].Game = Game;

}());
