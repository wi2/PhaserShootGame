# Phaser.io
Dans cet article, nous allons découvrir le framework Phaser et quelques unes de ses fonctionnalités à travers le développement d'un petit jeu de shoot.

Ce framework offre un accès à de nombreux outils qui permettent d'accélérer le développement de jeux mobiles ou desktop.

**Phaser.io, c'est quoi ?**
*C'est un framework qui permet de créer des jeux 2D pour  mobiles et/ou PC en utilisant javascript (ou typeScript) et HTML5* (Canvas et le WebGL), comme moteur de rendu.
Phaser s’appuie notamment sur la librairie de  [pixi.js](http://www.pixijs.com).
Ce framework offre un accès à de nombreux outils qui permettent d’accélérer le développement de jeux mobiles ou desktop avec notamment :
- Une gestion du chargement des ressources via un preloader
- Un moteur physique pour gérer les colisions ...
- La gestion des sprites pour vos animations
- L'intégration des particules
- La gestion de sons et musiques
- Gestion facilitée du clavier et souris
- Orientation de la caméra
- L'utilisation de tilemaps
- La compatibilité mobile avec la possibilité d'adapter la taille du jeu à l'écran
- ...

Vous trouverez de nombreux [exemples très simples](http://examples.phaser.io/) et une [documentation](http://docs.phaser.io/)  sur le site de http://phaser.io/

Les sources sont bien sur aussi sur [Github](https://github.com/photonstorm/phaser)
> **Actuellement en version 2.2.2**, la version 3 est en cours de développement.

**Comment ça marche ?**
Phaser permet de décomposer son jeu en différentes étapes (*Phaser State*) :
 boot => preload => menu => jeu  =>  ...


----------

#### Nous allons voir comment :
>
 - décomposer son application en étapes (Phaser State)
 - configurer son application
 - pré-charger les assets et les ajouter à la scène
 - ajouter des évènements a un élément visuel (sprite)
 - attacher des comportements (gravité, vélocité, ...) à un sprite
 - utiliser un scénario pour chaque étape (preload, create, update, ...)
 - Ajouter des méthodes personnalisées au sein des étapes

----------


## Création d'un jeu de shoot.
Créer un jeu qui comportera 4 écrans :
>
 - L'écran de pré-chargement des éléments du jeu
 - L'écran du menu principal
 - L'écran du jeu
 - L'écran pour afficher le résultat

Le but du jeu étant d'amasser un maximum de points en cliquant sur les ballons qui s'envolent de manière aléatoire.

### Comment allons nous procéder pour notre jeu ?
Nous allons décomposer notre jeu en différentes étapes :
>
 - **Boot**, qui va initialiser quelques paramètres globaux de l'application
 - **Preloader**, qui va charger tous les éléments visuels et afficher un petit loading
 - **Menu**, qui va afficher un bouton start afin de démarrer le jeu
 - **Game**, l'étape qui va représenter notre jeu de shoot
 - **Score**, pour afficher le score et pouvoir recommencer à jouer

Pour chaque étape, voici les principales méthodes qui sont appelées, par la librairie, dans cette ordre :

>
 - **init** : Première méthode appelée à l'initialisation de l'étape (que nous n'utiliserons pas)
 - **preload** : comme son nom l'indique permet de pré-charger les éléments
 - **create** : cette étape est la mise en place du jeu, la création des éléments
 - **update** : c'est à cette étape que commence le jeu et son déroulement.
 - **shutdown** : dernière méthode appelée lorsque l'on quitte l'étape (que nous n'utiliserons pas)


----------


## Installation
Sur Github :
> https://github.com/photonstorm/phaser

Avec Bower :
> bower install phaser-official --save

Ou commencer rapidement avec yeoman :
>
Installer node.js,
Installer yeoman : ```npm install -g yo```
puis, ```npm install -g yo generator-phaser```
yo phaser  (pour notre exemple nous avons appelé notre jeu 'shoot')

> Si lors de l'installation, une erreur survient suite à cette commande, essayez un ```sudo npm install```

**Maintenant vous êtes prêt à démarrer.**
Activer [livereload](http://livereload.com/) sur votre navigateur (facultatif), pour le rechargement automatique de votre navigateur.

#### Vous devriez retrouver une arborescence telle que ci-dessous :
```
|-- node_modules
  |-- ...
|-- src
    |-- assets
    |-- bower_components
      |-- phaser-official
        |-- ...
    |-- css
      |-- main.css
    |-- js
      |-- boot.js
      |-- game.js
      |-- main.js
      |-- menu.js
      |-- preloader.js
  |-- index.html
|-- gulpfile.js
|-- package.json
|-- ...
```
Maintenant, vous pouvez lancer un ```npm start``` dans la console et, tester que votre installation s'est correctement déroulée. Pour cela, ouvrer votre navigateur sur http://localhost:9000

> Le jeu par défaut ne comprends que 2 écrans (+ l'écran de loading)


#### Aussi,
Dans le fichier gulpfile.js,  nous avons fais le choix de désactiver le reporter par défaut de lint... Afin d'éviter d'afficher les warning
```
gulp.task('lint', function() {
  gulp.src(paths.js)
    .pipe(jshint('.jshintrc'))
//    .pipe(jshint.reporter('default'))
    .on('error', gutil.log);
});
```
----------

## Présentation du jeu
**Un jeu ou il faut tirer sur tout ce qui bouge**

> Notre jeu se composera de 5 étapes (state) :
 - **Boot** :  qui va charger les éléements du preload et appliquer la configuration de base de notre application
 - **Preloader** :   Va charger tous les assets du jeu
 - **Menu** :   Un menu d'accueil avant de commencer le jeu
 - **Game** :   le jeu
 - **Score** : Affiche le score et permet de relancer le jeu

Tout d'abord nous allons **nettoyer les sources générées et supprimer ce dont nous n'aurons pas besoin**.. et finalement **rajouter les fichiers manquants**.

>
> **Inventaire des besoins : **
> - une image (que nous appellerons un sprite) : qui sera l'élément à shooter (ballon.png).
> - Ajouter le fichier score.js pour notre 5e étape et l'ajouter dans les fichiers index.html et main.js

----------

### Après nettoyage,

```
<!-- index.html -->
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>shoot</title>
  <!-- build:css main.min.css -->
  <link rel="stylesheet" href="css/main.css">
  <!-- /build -->
</head>
<body>
  <div id="shoot-game" class="game"></div>
  <!-- build:remove -->
  <script src="http://localhost:35729/livereload.js"></script>
  <!-- /build -->
  <!-- build:js main.min.js -->
  <script src="bower_components/phaser-official/build/phaser.min.js"></script>
  <script src="js/boot.js"></script>
  <script src="js/preloader.js"></script>
  <script src="js/menu.js"></script>
  <script src="js/game.js"></script>
  <script src="js/score.js"></script>
  <script src="js/main.js"></script>
  <!-- yo phaser:state new-state-files-put-here -->
  <!-- /build -->
</body>
</html>
```
Ci-dessus, nous avons seulement ajouté le chargement du script score.js.

----------

```
//main.js
window.onload = function () {
  'use strict';
  var game
    , ns = window['shoot'];

  //initialisation du jeu
  game = new Phaser.Game(640, 480, Phaser.AUTO, 'shoot-game');

  //ajout des differents etapes (states) du jeux
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('score', ns.Score);// ajout
  game.state.add('game', ns.Game);

  // lancement du jeu
  game.state.start('boot');
};
```
Ci-dessus, nous avons ajouter l'étape score à notre application

----------

```
//boot.js
...
create: function () {
   this.game.stage.backgroundColor = '#ffffff';
   ...
}
```
*On initialise les paramètres globaux de l'application.*
Ici une fois le chargement de la page terminé, on initialise le jeu, ajoute les étapes et lance la premiere étape (boot).
Les paramètres n'ont pas été modifié par rapport à notre installation de départ, elles correspondent a nos besoins.  Nous avons, néanmoins, ajouter un fond blanc

----------

```
// preloader.js
Preloader.prototype = {
  preload: function () {
    ...
    this.load.image('ballon', 'assets/ballon.png');
  },

...
```
On précharge les assets
Suppression du chargement des textes (minecraft).
On a changé l'asset player par ballon qui sera la cible à shooter.

----------

```
//menu.js
(function() {
  'use strict';

  function Menu() {}

  Menu.prototype = {

    create: function () {},
    update: function () {},
    onDown: function () {},// onclick
    addText: function () {}//Ajout du texte

  };

  window['shoot'] = window['shoot'] || {};
  window['shoot'].Menu = Menu;

}());

```
Affichage du menu du jeu, a savoir un titre avec un bouton start afin de passer à l'étape suivante et de démarrer le jeu.

----------

```
//game.js
(function() {
  'use strict';

  function Game() {}

  Game.prototype = {

    create: function () {},
    update: function () {},
    addTarget: function () {},//ajout d'un sprite
    removeTarget: function () {},//supprime le sprite
    next: function () {},//aller à l'étape suivante : score
    renderPoint: function () {},// affiche les points
    addScoreText: function () {}//ajout l'élément score à la scène

  };
  window['shoot'] = window['shoot'] || {};
  window['shoot'].Game = Game;

}());
```
Ci-dessus, les principales méthodes que nous allons utiliser pour notre jeu.

----------

```
(function() {
  'use strict';

  function Score() {}

  Score.prototype = {
    create: function () {},
    onDown: function () { },// onclick
    addScoreText: function () {}//ajout du texte
  };

  window['shoot'] = window['shoot'] || {};
  window['shoot'].Score = Score;

}());
```
Fin du jeu et affichage du score


----------


### Passons à la partie menu

#### Dans un premier temps on initialise :
```
// menu.js
function Menu() {
  //on initialise les textes
  this.startText = null;
}
```
#### Création de notre élément texte
```
// menu.js
create: function () {
  this.addText();
},

...

addText: function () {
  this.startText = this.add.text(
    this.game.width / 2,
    this.game.height / 2,
    " Shoot Balloon Game \n Click to START ",
    {font: "36px Arial", fill: '#fff', align: 'center'  } // style du texte
  );
  this.startText.setShadow(2, 2, 'rgba(25,25,25,0.5)', 0);
  this.startText.anchor.setTo(0.5, 0.5); // permet de centrer l'élément
  this.startText.inputEnabled = true; // autorise évènements

  // ajout d'un evenement onmousedown pour demarrer le jeu
  this.startText.events.onInputDown.add(this.onDown, this);
},

...

// appel lorsque l'on clique sur le texte
onDown: function () {
  this.game.state.start('game'); // démarrage du jeu
}

...

```

----------


Affichage du menu du jeu, a savoir un titre avec un bouton start afin de passer à l'étape suivante et de demarrer le jeu.


----------


### Passons à la partie Game

#### Création de notre élément texte
```
// game.js
...
//Dans un premier temps on initialise :
function Game() {
  this.targets = null;
  this.nb = null;
  this.points = null;
  this.scoreText = null;
}

...
Game.prototype = {
  create: function () {
    // initialise l'étape
  },
  update: function () {
    // deroulement de l'étape
  },
  addTarget: function () {
    // ajouter une cible
  },
  removeTarget: function (i) {
    //supprimer une cible
  },
  renderPoint: function () {
    //affiche les points
  },
  next: function () {
    // passage a l'étape suivante : score
  }
};
```
#### method create()
initialisation de l'étape
```
// game.js
create: function () {
  // on initialise de le tableau qui vont repertorier les objets à shooter
  this.targets = [];
  this.nb = 0;
  this.points = 0;
  this.addScoreText();

  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  this.game.physics.arcade.gravity.y = -300;// global gravity
}
```
#### method renderPoint()
Formattage pour l'affichage du nombre de points
```
// game.js
renderPoint: function () {
  this.scoreText.text = this.points + " point" + ((this.points>1) ? "s" : "");
}
```

#### method next()
on crée à la volée une variable global a notre jeu et on lui passe le nombre de points
puis on l'envoie à l'étape suivante.
```
// game.js
next: function () {
  window['shoot'].score = this.points;
  //on envoie a l'étape suivante : l'affichage du score
  this.game.state.start('score');
}
```
#### method addScoreText
Ajout du nombre de points
```
addScoreText: function () {
  this.scoreText = this.add.text(
    35,
    25,
    "",
    {font: "16px Arial", fill: '#fff', align: 'left' } // style du texte
  );
  this.scoreText.setShadow(1, 1, 'rgba(25,25,25,0.5)', 0);
  this.renderPoint(); // on montre les points
  this.scoreText.anchor.setTo(0.5, 0.5); // permet de centrer l'élément
}
```
#### method removeTarget()
Suppression de la cible avec la méthode kill et suppression du tableau d'observation
```
// game.js
removeTarget: function () {
  this.targets[i].kill();
  this.targets.splice(i,1);
}
```
#### method addTarget()
Ajout de cible
```
// game.js
addTarget: function () {
  var that = this;
// coordonnées aléatoire pour positionner le ballon
  var x = this.game.rnd.integerInRange(20, this.game.width - 20)
    , y = this.game.rnd.integerInRange(this.game.height+50, this.game.height+250);

  // ajout du sprite (ballon) sur la scène
  var target = this.add.sprite(x, y, 'ballon');
  target.anchor.setTo(0.5, 0.5);// centrer l'élément

  // on autorise les evenements sur le sprite
  target.inputEnabled = true;

  // on attache la lib physics au sprite
  this.game.physics.enable( [target], Phaser.Physics.ARCADE);

  // ajout d'une petite force gravitationnelle horizontale
  target.body.gravity.x = this.game.rnd.integerInRange(-50, 50);

  target.events.onInputDown.add(function(){
    // lorsque la cible est cliqué, on supprime le sprite, on incrémente les points et on affiche le nouveau score.
    for(var i=0;i < that.targets.length; i++) {
      if (that.targets[i] === target) {
        that.removeTarget(i);
        that.points++;
        that.renderPoint();
      }
    }
  }, target); // event: onmousedown
  this.targets.push(target);
}
```
#### method update()
initialisation de l'étape
```
// game.js
update: function () {
  this.nb++;
  if (this.nb % 50 === 0) {// toutes les 50 images
  //ajout d'une cible seulement si il y en moins que 5
    if (this.targets.length < 5)
      this.addTarget();
  } else {
    for (var i=0; i<this.targets.length; i++) {
      // si la cible depasse le haut de l'écran de 100px, on supprime la cible
      if (this.targets[i].y < -100)
        this.removeTarget(i);
    }
  }

  // une fois que l'animation a atteint 1000 images. On stop le jeu et passe à l'étape suivante : le score
  if (this.nb > 1000)
    this.next();
}
```

----------

Affichage du menu du jeu, a savoir un titre avec un bouton start afin de passer à l'étape suivante et de demarrer le jeu.


----------


### Passons à la partie score

#### Dans un premier temps on initialise :
```
// score.js
function Score() {
  //on initialise les textes
  this.scoreText = null;
}
```
#### Création de notre élément texte
```
// score.js
create: function () {
  this.points = window['shoot'].score;
  this.addScoreText();
},

// appel lorsque l'on clique sur le texte
onDown: function () {
  this.game.state.start('game');//recommencer
}

...

addScoreText: function () {
  this.scoreText = this.add.text(
    this.game.width / 2,
    this.game.height / 2,
    " Partie terminé \n Votre score : " + this.points + " points \n Cliquer ici pour recommencer ",
    {font: "24px Arial", fill: '#ffffff', align: 'center' } // style du texte
  );

  this.scoreText.anchor.setTo(0.5, 0.5); // permet de centrer l'élément
  this.scoreText.inputEnabled = true; // autorise evenements
  this.scoreText.events.onInputDown.add(this.onDown, this);// ajout d'un evenement onmousedown pour demarrer le jeu
    }

...

```

----------

Affichage du score à la fin de la partie.


----------
### Notre modeste jeu est finalement terminé.

>
> **pour un prochain tuto : **
> - ajouter différents sprite (ballon d'autre couleur)
> - ajouter une animation lors du shoot de celui-ci
> - Ajouter d'un son lorsque l'on shoot un ballon
> - ajouter un fond plus sympa
