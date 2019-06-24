carte = {

    viewMap: L.map('mapid', { gestureHandling: true, gestureHandlingOptions: { duration: 5000 } }).setView([45.764043, 4.835659], 13),

    initMap: function () {
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiaXNwaXJrIiwiYSI6ImNqdGc2M2ZxNzAwY3I0M3A5anlsZHBzNHYifQ.ZBDPL2DEHO5AKzMXUB1klQ',

        }).addTo(carte.viewMap);
        carte.viewMap.scrollWheelZoom.disable();
    },

    createMarker: function (stations) {
        var redIcon = L.icon({
            iconUrl: 'images/red_marker.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
            iconSize: [35, 40], // size of the icon
            // size of the shadow
            shadowAnchor: [11, 20],
            popupAnchor: [0, -15],
        });
        markers = L.markerClusterGroup();
        stations.forEach(station => {

            var marker = L.marker(new L.LatLng(station.position.lat, station.position.lng));

            marker.name = station.name;
            marker.bindPopup(marker.name);
            markers.addLayer(marker);
            if (station.available_bikes <= 0 || station.status === 'FERMER') {
                marker.setIcon(redIcon);
            };
            marker.addEventListener("click", function (e) {
                carte.viewMap.setView(e.latlng, 17);
                document.querySelector("div.card-header h3").textContent = station.name;
                var stationStatus = document.querySelector("div.card-body div:nth-child(1)  p");
                var stationAddress = document.querySelector("div:nth-child(3) > p");
                var stationBike = document.querySelector("div:nth-child(5) > p");
                document.querySelector("form").style.display = "block";
                document.querySelector("#alert-form").style.display = "none";
                var icoClock = document.querySelector("div.card-body div:nth-child(1) i");
                var icoMarker = document.querySelector("div.card-body div:nth-child(3) i");
                var icoBike = document.querySelector("div.card-body div:nth-child(5) i");
                var formFooter = document.getElementById("form-footer");
                var mapLegend = document.getElementById("map-legend");
                var buttonReserve = document.getElementById("button-reservation");
                var buttonSucess = document.getElementById("reservation-success");
                var buttonDelete = document.getElementById("canvas-delete");
                var sectionReserve = document.getElementById("section-reservation");
                sectionReserve.style.display = "none";
                buttonDelete.style.display = "none";
                buttonSucess.style.display = "none";
                buttonReserve.style.display = "inline-block";
                mapLegend.style.display = "block";
                createCanvas.clearCanvas();
                if (station.address === "") {
                    stationAddress.classList.add("text-danger");
                    stationAddress.textContent = "Pas d'adresse renseigné";
                    icoMarker.classList.remove("text-primary");
                    icoMarker.classList.add("text-danger");
                } else {
                    stationAddress.classList.remove("text-danger");
                    stationAddress.classList.add("text-primary");
                    stationAddress.textContent = station.address.toUpperCase();
                    icoMarker.classList.remove("text-danger");
                    icoMarker.classList.add("text-primary");
                }
                if (station.status === 'OPEN') {
                    stationStatus.textContent = "OUVERT";
                    stationStatus.classList.remove("text-danger");
                    stationStatus.classList.add("text-success", "font-weight-bold");
                    icoClock.classList.remove("text-danger");
                    icoClock.classList.add("text-primary");
                } else {
                    stationStatus.textContent = "FERMER";
                    stationStatus.classList.add("text-danger", "font-weight-bold");
                    icoClock.classList.remove("text-primary");
                    icoClock.classList.add("text-danger");
                }
                if (station.available_bikes > 0) {
                    stationBike.textContent = station.available_bikes + " vélib(s) disponibles."
                    stationBike.classList.remove("text-danger");
                    stationBike.classList.add("text-success", "font-weight-bold");
                    icoBike.classList.remove("text-danger");
                    icoBike.classList.add("text-primary");
                } else {
                    stationBike.textContent = station.available_bikes + " vélib disponible.";
                    stationBike.classList.remove("text-success");
                    icoBike.classList.remove("text-primary");
                    icoBike.classList.add("text-danger");
                    stationBike.classList.add("text-danger", "font-weight-bold");
                    icoMarker.classList.remove("text-primary");
                    icoMarker.classList.add("text-danger");
                }
                if (icoBike.classList.contains("text-danger") || icoClock.classList.contains("text-danger")) {
                    formFooter.style.display = "none";
                    sectionReserve.style.display = "none";

                } else {
                    formFooter.style.display = "block";
                }


            })


        });
        carte.viewMap.addLayer(markers);
    }

}