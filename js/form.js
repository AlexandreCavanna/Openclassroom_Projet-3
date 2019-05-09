form = {
    manageForm: function() {
        var buttonResetMap = document.getElementById("reset-map");
        buttonResetMap.addEventListener("click", function() {
            carte.viewMap.setView([45.764043, 4.835659], 13);
        })
        buttonResetMap.onclick = function() {
            carte.viewMap.closePopup();
        }

        var buttonReserve = document.getElementById("button-reservation");
        var sectionReserve = document.getElementById("section-reservation");
        var mapLegend = document.getElementById("map-legend");
        buttonReserve.addEventListener("click", function() {
            buttonReserve.style.display = "none";
            mapLegend.style.display = "none";
            sectionReserve.style.display = "block";
            
        })
    }
}