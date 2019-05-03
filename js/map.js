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
        for (var i = 0; i < stations.length; i++) {
            var adresse = stations[i].name;
            var marker = L.marker(new L.LatLng(stations[i].position.lat, stations[i].position.lng)).on('click', function(e) {
            carte.viewMap.setView(e.latlng, 17);
                
                
                    document.querySelector("div#zone_reservation h3").textContent = station.name;
                
               
            });
            marker.bindPopup(adresse);
            markers.addLayer(marker);
        }
        carte.viewMap.addLayer(markers);
    }
}