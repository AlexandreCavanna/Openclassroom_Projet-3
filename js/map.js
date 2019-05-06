carte = {

    viewMap: L.map('mapid').setView([45.764043, 4.835659], 13),

    initMap: function() {
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiaXNwaXJrIiwiYSI6ImNqdGc2M2ZxNzAwY3I0M3A5anlsZHBzNHYifQ.ZBDPL2DEHO5AKzMXUB1klQ',

        }).addTo(carte.viewMap);
    },

    createMarker: function(stations) {
<<<<<<< HEAD
<<<<<<< HEAD
        var redIcon = L.icon({
            iconUrl: 'images/red_marker.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
            iconSize:     [35, 40], // size of the icon
             // size of the shadow
            shadowAnchor: [11, 20],
            popupAnchor:  [0, -15],
        });
        markers = L.markerClusterGroup();
        stations.forEach(station => {
           
            var marker = L.marker(new L.LatLng(station.position.lat, station.position.lng));
            
            marker.name = station.name;
            marker.bindPopup(marker.name);
            markers.addLayer(marker);
            if(station.available_bikes <= 0 || station.status === 'FERMER') {
                marker.setIcon(redIcon);
            };
=======
        markers = L.markerClusterGroup();
        stations.forEach(station => {
            var marker = L.marker(new L.LatLng(station.position.lat, station.position.lng));
            marker.name = station.name;
            marker.bindPopup(marker.name);
            markers.addLayer(marker);
>>>>>>> 43162e9ac08737f07725075fbf0c954e6d3f895b
=======
        markers = L.markerClusterGroup();
        stations.forEach(station => {
            var marker = L.marker(new L.LatLng(station.position.lat, station.position.lng));
            marker.name = station.name;
            marker.bindPopup(marker.name);
            markers.addLayer(marker);
>>>>>>> 43162e9ac08737f07725075fbf0c954e6d3f895b
            marker.addEventListener("click", function(e) {
            carte.viewMap.setView(e.latlng, 17);
                                document.querySelector("div#zone_reservation h3").textContent = station.name;
            var stationStatus = document.querySelector("#zone_reservation > p:nth-child(3)");
<<<<<<< HEAD
<<<<<<< HEAD
            var stationAddress = document.querySelector("#zone_reservation > p:nth-child(5)");
            var stationBike = document.querySelector("#zone_reservation > p:nth-child(7)");
            if (station.address === "") {
                stationAddress.classList.add("text-primary");
                stationAddress.textContent = "Pas d'adresse renseigné"
               } else {
                stationAddress.classList.add("text-primary");
                stationAddress.textContent = station.address.toUpperCase();
             
               }
                if ( station.status === 'OPEN') {
                    stationStatus.textContent = "OUVERT";
                    stationStatus.classList.remove("text-danger");
                    stationStatus.classList.add("text-success","font-weight-bold");
                } else {
                    stationStatus.textContent = "FERMER";
                    stationStatus.classList.add("text-danger", "font-weight-bold");
                }
               if (station.available_bikes > 0)  {
                stationBike.textContent = station.available_bikes + " vélib(s) disponibles."
                stationBike.classList.remove("text-danger");
                stationBike.classList.add("text-success", "font-weight-bold");
               } else {
                stationBike.textContent = station.available_bikes + " vélib disponible.";
                stationBike.classList.remove("text-success");
                stationBike.classList.add("text-danger", "font-weight-bold");
               } 
              
           })
=======
=======
>>>>>>> 43162e9ac08737f07725075fbf0c954e6d3f895b
                                document.querySelector("#zone_reservation > p:nth-child(5)").textContent = station.address;
                                document.querySelector("#zone_reservation > p:nth-child(7)").textContent = station.available_bike_stands;
                if ( station.status === 'OPEN') {
                    stationStatus.textContent = "OUVERT";
                } else {
                    stationStatus.textContent = "FERMER";
                }
            })
<<<<<<< HEAD
>>>>>>> 43162e9ac08737f07725075fbf0c954e6d3f895b
=======
>>>>>>> 43162e9ac08737f07725075fbf0c954e6d3f895b
        });      
        carte.viewMap.addLayer(markers);
    }
}