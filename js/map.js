
carte = {
    
    viewMap : L.map('mapid').setView([45.764043, 4.835659], 13),
    
    initMap : function() {
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiaXNwaXJrIiwiYSI6ImNqdGc2M2ZxNzAwY3I0M3A5anlsZHBzNHYifQ.ZBDPL2DEHO5AKzMXUB1klQ',
                   
        }).addTo(carte.viewMap);
    },
    
    createMarker : function(station) {
       let marker = L.marker([station.position.lat, station.position.lng]).addTo(carte.viewMap);
       marker.bindTooltip(station.name,{opacity : 1});
       marker.on('click',function(e) {
       carte.viewMap.setView(e.latlng,17);
       });
    }
}









