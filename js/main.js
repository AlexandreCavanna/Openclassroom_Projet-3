const myApi = Object.create(JCDecauxApi);
$('.leaflet-tooltip').css('font-size', 30);
let url = 'https://api.jcdecaux.com/vls/v1/stations?contract=';
url = myApi.createUrl(url);
//console.log(url);

carte.initMap();
ajax(url, function(resp) {
    let stations = JSON.parse(resp);
<<<<<<< HEAD
    console.log(resp);
=======
    //console.log(resp);
>>>>>>> 43162e9ac08737f07725075fbf0c954e6d3f895b
    carte.createMarker(stations);
});

 



