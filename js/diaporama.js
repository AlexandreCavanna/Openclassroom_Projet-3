diaporama = {
  
    imgSlider : document.querySelector('.imgSlider'),
    elementPrev : document.querySelector('#prev'),
    elementNext : document.querySelector('#next'),
    play : document.querySelector('.play'),
    stop : document.querySelector('.stop'),
    imagesTab : ['images/diapo1_pwdbua_c_scale,w_1428.png', 'images/diapo2.png', 'images/diapo3.png', 'images/diapo4.png', 'images/diapo5.png', 'images/diapo6.png'],
    imagesTabSmall : ['images/diapo1s.png', 'images/diapo2s.png', 'images/diapo3s.png', 'images/diapo4s.png', 'images/diapo5s.png', 'images/diapo6s.png'],
    textTab :
      [
        '<span class="font-weight-bold">Bienvenue sur le site de réservation de velo de Lyon :</span> <br> Ce diaporama vous montre la façon d\'utiliser la carte',
        '<span class="font-weight-bold">Choissisez une station :</span> <br> Sélectionner une station en cliquant sur un markeur pour afficher ses informations et commencer votre réservation. ',
        '<span class="font-weight-bold">Bouton réserver :</span> <br> Une fois le markeur cliqué, cliquez sur le bouton réserver. ',
        '<span class="font-weight-bold">Formulaire :</span> <br> Remplissez le formulaire. ',
        '<span class="font-weight-bold">Confirmation et réservation de votre vélo :</span> <br> Après avoir signé, confirmez votre réservation en cliquant sur "Valider".',
        '<span class="font-weight-bold">Réservation réalisée :</span> <br> Votre vélo est réservé pendant 20min mais vous pouvez annuler à tout moment en cliquant sur "Annuler la réservation".',
      ],
    counter : 0,
    interval : 0,
    x : window.matchMedia("(min-width: 700px)"),
    y : window.matchMedia("(max-width: 500px)"),
    
  

  // fonctionnalitées
  next() {
    this.counter++;

    if (this.x.matches) {
      if (this.counter >= this.imagesTab.length) {
        diaporama.counter = 0;
      }
      diaporama.imgSlider.srcset = this.imagesTab[this.counter];
    } else {
      if (this.y.matches) {
        if (this.counter >= this.imagesTabSmall.length) {
          diaporama.counter = 0;
        }
        diaporama.imgSlider.srcset = this.imagesTabSmall[this.counter];
      }
    }
    document.getElementById('textSlide').innerHTML = this.textTab[this.counter];
  },

  prev() {
    this.counter--;
    if (this.x.matches) {
    if (this.counter < 0) {
      this.counter = this.imagesTab.length - 1;
    }
    diaporama.imgSlider.srcset = this.imagesTab[this.counter];
    }
    
    else {
      if (this.y.matches) {
        if (this.counter < 0) {
          this.counter = this.imagesTabSmall.length - 1;
        }
        diaporama.imgSlider.srcset = this.imagesTabSmall[this.counter];
      }
  }
  document.getElementById('textSlide').innerHTML = this.textTab[this.counter];
},

  demarrer() {
    if (this.x.matches) {
      this.imgSlider.srcset = this.imagesTab[this.counter];
    } else if (this.y.matches) {
      this.counter = this.imagesTabSmall.length - 1;
    }
    clearInterval(this.interval);
    this.interval = setInterval(() => { this.next() }, 5000);
  },

  arreter() {
    clearInterval(this.interval);
  },

  initDiaporama() {
    this.elementNext.addEventListener('click', () => this.next());
    this.elementPrev.addEventListener('click', () => this.prev());
    document.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight') this.next();
      if (event.key === 'ArrowLeft') this.prev();
    })
    this.play.addEventListener('click', () => this.demarrer());
    this.stop.addEventListener('click', () => this.arreter());
    this.interval = setInterval(() => { this.next() }, 5000);
  }
}
