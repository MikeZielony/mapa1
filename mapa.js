var map = L.map('map').setView([50, 20], 11);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// var circle = L.circle([51.508, 20], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.1,
//     radius: 5000
// }).addTo(map);

// map.on('click', function (e) {
//     var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
//
// });

// var myGeoJSON = {
//     "type": "FeatureCollection",
//     "features": [{
//         "type": "Feature",
//         "geometry": {"type": "Point", "coordinates": [19.9052869,50.0924476]},
//         "id": "0244f737-7d80-4845-8f59-0fccb0632352",
//         "properties": {"name": "punkt", "punkt1": ""}
//     }, {
//         "type": "Feature",
//         "geometry": {"type": "Point", "coordinates": [19.9052869,50.0924476]},
//         "id": "221a7618-72bf-4f7c-9d8a-e28b263acf5a",
//         "properties": {"name": "punkt2"}
//     },{
//         "type": "Feature",
//     "geometry": {"type": "Point", "coordinates": [19.9052869,50.0924476]},
// "id": "221a7618-72bf-4f7c-9d8a-e28b263acf5a",
//     "properties": {"name": "punkt2"}}]
// }
// L.geoJSON(myGeoJSON).addTo(map);

map.on('click', onMapClick);

function onMapClick(e) {
    const coordinates = [];
    navigator.geolocation.watchPosition(

        data => {
            console.log(data);
            coordinates.push([data.coords.longitude, data.coords.latitude]);
            window.localStorage.setItem("coordinates", JSON.stringify(coordinates));
            var latlng = L.latLng(data.coords.latitude, data.coords.longitude);
            var marker = new L.Marker(latlng, {draggable: false});
          //  L.map('map').setView([data.coords.longitude, data.coords.longitude], 11);
            map.addLayer(marker);
            marker.bindPopup("<br />I am a here.").openPopup();
        },
        error => console.log(error),
        {
            enableHighAccuracy: true
        }
    );
    // var marker = new L.Marker(e.latlng, {draggable: true});
    // map.addLayer(marker);
    // marker.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
};

map.on('keypress', () => onMapDblClick());

function onMapDblClick() {
    var tempMarker = this;
    console.log('key press');
    // To remove marker on click of delete button in the popup of marker
    map.removeLayer(tempMarker);
};

