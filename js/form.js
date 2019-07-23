form = {
    buttonReserve: document.getElementById("button-reservation"),
    buttonErase: document.getElementById("canvas-delete"),
    buttonReservationDelete: document.getElementById("delete-reservation"),
    buttonSucess: document.getElementById("reservation-success"),
    sectionReserve: document.getElementById("section-reservation"),
    modalReservation: document.getElementById("modal-reservation"),
    sectionForm: document.getElementById("section-form"),
    alertForm: document.getElementById("alert-form"),
    reservationContainer: document.getElementById("reservation-container"),
    reservationTitle: document.getElementById("reservation-title"),
    reservationTime: document.getElementById("reservation-timer"),
    nomStation: document.getElementById("nom-station"),
    nomForm: document.getElementById("name"),
    prenomForm: document.getElementById("firstname"),
    formFooter: document.getElementById("form-footer"),
    mapLegend: document.getElementById("map-legend"),
    canvas: document.getElementById("canvas"),
    buttonResetMap: document.getElementById("reset-map"),
    showReservation() {
        this.buttonReserve.addEventListener("click", function () {
            form.sectionReserve.style.display = "block";
            form.mapLegend.style.display = "none";
            form.buttonReserve.style.display = "none";
            form.buttonErase.style.display = "inline-block";
             // On recupere les valeurs en local storage des champs nom et prenom pour les afficher
             // lorsque que l'on ouvre son navigateur
            form.prenomForm.value = localStorage.getItem("firstname");
            form.nomForm.value = localStorage.getItem("name");
        });
    },
    reservationSuccess() {
        this.buttonSucess.addEventListener("click", () => {
            // Pour recommencer Ã  0 le decompte si l'on reserve un velib sur une autre station
            clearInterval(form.x);
            // Gestion session et local storage
            sessionStorage.setItem("nameStation", this.nomStation.textContent);
            sessionStorage.setItem("name", this.nomForm.value);
            sessionStorage.setItem("firstname", this.prenomForm.value);
            sessionStorage.setItem("signature", this.canvas.toDataURL('image/jpeg', 0.5));
            localStorage.setItem("firstname", this.prenomForm.value);
            localStorage.setItem("name", this.nomForm.value);
            // Gestion des differents elements
            if (!this.prenomForm.value == "" && !this.nomForm.value == "") {
            form.buttonSucess.style.display = "none";
            form.sectionForm.style.display = "none";
            form.alertForm.style.display = "block";
            form.alertForm.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                Si vous voulez réserver un autre Vélib à une autre station, <span class="font-weight-bold">veuillez annuler la réservation en cours</span>.
            `;
            form.alertForm.classList.add("alert-danger");
            form.alertForm.classList.remove("alert-warning");
            form.mapLegend.style.display = "block";

            // On declenche le decompte de la reservation
            form.reservationTimer();
            } else if (this.prenomForm.value == "" && this.nomForm.value == "") {
                form.nomForm.style.borderColor = "red";
                form.prenomForm.style.borderColor = "red";
                alert("Un ou champs pour la réservation est manquant");
            } else if (this.prenomForm.value == "") {
                form.nomForm.style.borderColor = "initial";
                form.prenomForm.style.borderColor = "red";
                alert("Veuillez remplir votre Prénom");
            }
            else if (this.nomForm.value == "") {
                form.prenomForm.style.borderColor = "initial";
                form.nomForm.style.borderColor = "red";
                alert("Veuillez remplir votre Nom");
            }
        });
    },
    reservationTimer(dateEnCours) {
        // On cree une variable "dateFin" vide
        let dateFin;
        
        // On utilise la valeur "dateEnCours" dans la variable "dateFin"
        if(dateEnCours) {
            dateFin = new Date().getTime() + Number(dateEnCours);
         // Si dateEnCours est vide on stocke la date actuel + 20 minutes
        } else { 
            dateFin = new Date().getTime() + 1200000; // 1 200 000 = 20 minutes en millisecondes
        }

        // On utilise la methode setInterval pour repeter la fonction
        this.x = setInterval(() => {
            const dateActuel = new Date().getTime();
            const distance = dateFin - dateActuel;

            // On transforme les millisecondes en minutes et secondes
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let secondes = Math.floor((distance % (1000 * 60)) / 1000);
            
            // On stock la date actuel en milliseconde
            sessionStorage.setItem("temps", distance);

            // Permet d'afficher la reservation dans le container de la reservation en cours
            form.reservationSuccessDisplay(minutes, secondes);

           // Si le decompte arrive Ã  0, la reservation expire
            if (distance < 0) {
                form.expiredReservation();
            }
        });
    },
    reservationSuccessDisplay(minutes, secondes) {
        form.reservationContainer.classList.add("alert-success");
        form.reservationContainer.classList.remove("alert-secondary");
        form.reservationContainer.classList.remove("alert-danger");
        form.reservationTitle.classList.remove("text-center", "mb-0");
        form.reservationTime.style.display = "block";
        form.reservationTitle.textContent = " Votre réservation est validée !";
        form.reservationTime.innerHTML = `Bonjour <span class="font-weight-bold">${sessionStorage.firstname} ${sessionStorage.name}</span> vous avez réservé 1 vélib à la station <span class="font-weight-bold">${sessionStorage.nameStation}</span>. <br> Expire dans : <span class="font-weight-bold">${minutes} minute(s) et ${secondes} seconde(s)</span>.`
        form.modalReservation.style.display = "inline-block";
    },

    /**
     * Permet d'annuler une rÃ©servation
     */
    deleteReservation() {
        this.buttonReservationDelete.addEventListener("click", () => {
            form.reservationContainer.classList.remove("alert-success");
            form.reservationContainer.classList.add("alert-danger");
            form.reservationTitle.textContent = "Votre réservation est annulée !";
            form.reservationTitle.classList.add("text-center", "mb-0");
            form.reservationTime.style.display = "none";
            form.alertForm.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                Veuillez sélectionner une station !
            `;
            form.alertForm.classList.add("alert-warning");
            form.alertForm.classList.remove("alert-danger");
            form.modalReservation.style.display = "none";

            clearInterval(form.x);
            sessionStorage.clear();
        });
    },

    /**
     * Gestion de l'affichage Ã  l'expiration de la rÃ©servation
     */
    expiredReservation() {
        form.reservationContainer.classList.remove("alert-success");
        form.reservationContainer.classList.add("alert-danger");
        form.reservationTitle.textContent = "Votre réservation a expiré !";
        form.reservationTitle.classList.add("text-center", "mb-0");
        form.reservationTime.style.display = "none";
        form.modalReservation.style.display = "none";
        form.alertForm.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            Veuillez sélectionner une station !
        `;
        form.alertForm.classList.add("alert-warning");
        form.alertForm.classList.remove("alert-danger");

        clearInterval(form.x);
        sessionStorage.clear();
    },

    /**
     * Gestion du webStorage si il y a une rÃ©servation en cours
     */
    webStorage() {
        // On stock la date du session storage dans une variable
        let dateEnCours = sessionStorage.getItem("temps");

        // Si la valeur de "temps" est supÃ©rieur Ã  0, on reprends la rÃ©servation en cours
        if (dateEnCours > 0 ) {    
            // On relance le timer avec la date Ã  laquelle elle s'est arrÃªtÃ©
            form.reservationTimer(dateEnCours);
        }
    },
    initForm: function () {
        this.buttonResetMap.addEventListener("click", function () {
            carte.viewMap.setView([45.764043, 4.835659], 13);
        })
        this.buttonResetMap.onclick = function () {
            carte.viewMap.closePopup();
        }
        form.showReservation();
        form.reservationSuccess();
        form.deleteReservation();
        form.webStorage();
    }
}