createCanvas = {
  ecriture: false, // Attribut d'activation de l'écriture
  canvas: document.getElementById("canvas"), // Sélection du canvas dans le HTML
  context: null, // Définira le contexte d'utilisation du canvas
  signatureImg: null,

  // Méthode qui traduit l'événement Touch en Évent pour écrans tactiles
  convertTouchEvent: function (ev) {
    var touch, ev_type, mouse_ev;
    touch = ev.targetTouches[0];
    ev.preventDefault();
    switch (ev.type) {
      case 'touchstart':
        // S'assure qu'un doigt est sur la cible
        if (ev.targetTouches.length != 1) {
          return;
        }
        touch = ev.targetTouches[0];
        ev_type = 'mousedown';
        break;
      case 'touchmove':
        // S'assure qu'un doigt est sur la cible
        if (ev.targetTouches.length != 1) {
          return;
        }
        touch = ev.targetTouches[0];
        ev_type = 'mousemove';
        break;
      case 'touchend':
        // Sassure que le doigt a été enlever de la cible
        if (ev.changedTouches.length != 1) {
          return;
        }
        touch = ev.changedTouches[0];
        ev_type = 'mouseup';
        break;
      default:
        return;
    }

    mouse_ev = document.createEvent("MouseEvents");
    mouse_ev.initMouseEvent(
      ev_type, // Genre de l'événement
      true,
      true,
      window, // Vue de l'événement
      0, // Compte de clic de souris
      touch.screenX, // Coordonnée X de l'écran
      touch.screenY, // Coordonnée Y de l'écran
      touch.clientX, // Coordonnée X du client
      touch.clientY, // Coordonnée Y du client
      ev.ctrlKey, // Vérifie si la touche contrôle a été appuyée
      ev.altKey, // Vérifie si la touche alt a été appuyée
      ev.shiftKey, // Vérifie si la touche majuscule a été appuyée
      ev.metaKey, // Vérifie si la touche meta a été appuyée
      0, // Bouton de la souris
      null // Cible
    );
    this.dispatchEvent(mouse_ev);
    document.getElementById("reservation-success").style.display = "inline-block";
  },

  // Méthode qui récupére les coordonnées de l'Élément de pointage (souris, doigt...)
  getMousePos: function (event) {
    rect = this.canvas.getBoundingClientRect(); // Renvoie la taille d'un élément et sa position relative par rapport à la zone d'affichage

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  },

  // Méthode qui détermine le déplacement de l'élément de pointage
  deplacementSouris: function (event) {
    sourisPosition = this.getMousePos(event); // Coordonnées de l'élément de pointage retourner par la méthode "getMousePos"
    positionX = sourisPosition.x;
    positionY = sourisPosition.y;
    this.dessin(positionX, positionY);
  },

  // Méthode qui permet de dessiner dans le canvas
  dessin: function (positionX, positionY) {
    this.context = this.canvas.getContext("2d"); // Contexte du canvas
    this.context.lineWidth = 5; // Largeur du tracer

    if (this.ecriture) {
      this.context.lineTo(positionX, positionY); // Désigne le point d'arrivé du tracer
      this.context.stroke(); // Effectue le tracer
    }
  },

  // Méthode qui permet de désactiver l'écriture
  desactivationDessin: function () {
    this.ecriture = false; // Désactive l'écriture dans le canvas
  },

  // Méthode qui active et débute l'écriture dans le canvas
  activationDessin: function () {
    this.ecriture = true; // Active l'écriture sur le canvas
    this.context.beginPath(); // Commence un nouveau chemin de dessin
    this.context.moveTo(positionX, positionY); // Désigne le début du tracer
    document.getElementById("reservation-success").style.display = "inline-block";
  },
  // Méthode qui permet d'effacer le canvas
  clearCanvas: function () {
    this.context.clearRect(0, 0, 3000, 3000); // Réinitialise le canvas
  },
  initCanvas: function () {
    var mqdefault = window.matchMedia("(max-width: 576px)");
    var mqxs = window.matchMedia("(min-width: 576px)");
    var mqsm = window.matchMedia("(min-width: 778px)");
    var mqmd = window.matchMedia("(min-width: 992px)");
    var mqlg = window.matchMedia("(min-width: 1200px)");
    var mqlfullhd = window.matchMedia("(min-width: 1920px)");
    var mql4k = window.matchMedia("(min-width: 2560px)");
    if (mqdefault.matches) {
     this.canvas.width = 230; // Largeur du canvas
     this.canvas.height = 300;// Hauteur du canvas
    }
    if (mqxs.matches) {
     this.canvas.width = 500; // Largeur du canvas
     this.canvas.height = 300;// Hauteur du canvas
    } if (mqsm.matches) {
     this.canvas.width = 700; // Largeur du canvas
     this.canvas.height = 400; // Hauteur du canvas
    } 
    if (mqmd.matches) {
     this.canvas.width = 310; // Largeur du canvas
     this.canvas.height = 300; // Hauteur du canvas
    }
    if (mqlg.matches) {
     this.canvas.width = 520; // Largeur du canvas
     this.canvas.height = 400; // Hauteur du canvas
    }
    if (mqlfullhd.matches) {
     this.canvas.width = 680; // Largeur du canvas
     this.canvas.height = 400; // Hauteur du canvas
    }
    if (mql4k.matches) {
     this.canvas.width = 900; // Largeur du canvas
     this.canvas.height = 400; // Hauteur du canvas
    }
    // Appel des méthodes sur écrans tactiles
    createCanvas.canvas.addEventListener("touchstart", createCanvas.convertTouchEvent);
    createCanvas.canvas.addEventListener("touchmove", createCanvas.convertTouchEvent);
    createCanvas.canvas.addEventListener("touchend", createCanvas.convertTouchEvent);

    // Appel des méthodes sur PC
    createCanvas.canvas.addEventListener("mousedown", createCanvas.activationDessin.bind(createCanvas));
    createCanvas.canvas.addEventListener("mousemove", createCanvas.deplacementSouris.bind(createCanvas));
    createCanvas.canvas.addEventListener("mouseup", createCanvas.desactivationDessin.bind(createCanvas));

    document.getElementById("canvas-delete").addEventListener("click", () => {
      createCanvas.clearCanvas(); // Efface le contenu du canvas
      document.getElementById("reservation-success").style.display = "none";
    });
  },
}
