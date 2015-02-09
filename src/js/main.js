window.onload = function () {
  'use strict';

  var game
    , ns = window['shoot'];

  game = new Phaser.Game(640, 480, Phaser.AUTO, 'shoot-game'); //initialisation du jeu
  //ajout des differents etapes (states) du jeux
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('score', ns.Score);
  game.state.add('game', ns.Game);
  /* yo phaser:state new-state-files-put-here */

  game.state.start('boot');// lancement du jeu
};
