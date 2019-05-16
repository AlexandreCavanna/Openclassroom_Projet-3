form = {
    buttonReservation: document.getElementById("button-reservation"), // Bouton pour faire apparaÃ®tre le formulaire de rÃ©servation
    buttonReservationSuccess: document.getElementById("reservation-success"), // Bouton pour valider la rÃ©servation
    buttonReservationDelete: document.getElementById("delete-reservation"), // Bouton pour annuler la rÃ©servation en cours
    modalReservation: document.getElementById("modal-reservation"), // Bouton pour afficher le modal de rÃ©servation
    mapLegend: document.getElementById("map-legend"), // LÃ©gende de la carte
    sectionReservation: document.getElementById("section-reservation"), // Section de la rÃ©servation
    canvasClean: document.getElementById("canvas-delete"), // Bouton pour nettoyer le canvas
    alertForm: document.getElementById("alert-form"), // Message d'alerte suivant la situation
    sectionForm: document.getElementById("section-form"), // La section entiÃ¨re d'une rÃ©servation
    reservationTitle: document.getElementById("reservation-title"), // Titre de la rÃ©servation en cours
    reservationTime: document.getElementById("reservation-timer"), // Temps de la rÃ©servation en cours
    reservationContainer: document.getElementById("reservation-container"), // Container de la rÃ©servation en cours
    manageForm: function() {
        this.buttonResetMap = document.getElementById("reset-map");
        this.buttonResetMap.addEventListener("click", function() {
            carte.viewMap.setView([45.764043, 4.835659], 13);
        })
        this.buttonResetMap.onclick = function() {
            carte.viewMap.closePopup();
        }

        this.buttonReserve = document.getElementById("button-reservation");
        this.buttonErase = document.getElementById("canvas-delete");
        this.sectionReserve = document.getElementById("section-reservation");
        this.mapLegend = document.getElementById("map-legend");
        createCanvas.canvas = document.getElementById("canvas");
        
        this.buttonReserve.addEventListener("click", function() {
            buttonReserve.style.display = "none";
            mapLegend.style.display = "none";
            sectionReserve.style.display = "block";
            buttonErase.style.display = "inline-block";
            canvas.style.border="1px solid black";
            
            
        })
    }
}
