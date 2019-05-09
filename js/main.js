const myApi = Object.create(JCDecauxApi);
$('.leaflet-tooltip').css('font-size', 30);
let url = 'https://api.jcdecaux.com/vls/v1/stations?contract=';
url = myApi.createUrl(url);
//console.log(url);

carte.initMap();
ajax(url, function(resp) {
    let stations = JSON.parse(resp);
    //console.log(resp);
    carte.createMarker(stations);
    form.manageForm(stations);
});

 



