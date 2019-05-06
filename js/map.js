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
        markers = L.markerClusterGroup();
        stations.forEach(station => {
            var marker = L.marker(new L.LatLng(station.position.lat, station.position.lng));
            marker.name = station.name;
            marker.bindPopup(marker.name);
            markers.addLayer(marker);
            marker.addEventListener("click", function(e) {
            carte.viewMap.setView(e.latlng, 17);
                                document.querySelector("div#zone_reservation h3").textContent = station.name;
            var stationStatus = document.querySelector("#zone_reservation > p:nth-child(3)");
                                document.querySelector("#zone_reservation > p:nth-child(5)").textContent = station.address;
                                document.querySelector("#zone_reservation > p:nth-child(7)").textContent = station.available_bike_stands;
                if ( station.status === 'OPEN') {
                    stationStatus.textContent = "OUVERT";
                } else {
                    stationStatus.textContent = "FERMER";
                }
            })
        });      
        carte.viewMap.addLayer(markers);
    }
}