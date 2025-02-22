mapboxgl.accessToken = mapToken;
const setMap = new mapboxgl.Map({
    container: 'setMap',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [77.2029, 28.6139],
    zoom: 7
});

// styles of map
const layerList = document.getElementById('setMap-menu');
const inputs = layerList.getElementsByTagName('input');

for (const input of inputs) {
    input.onclick = (layer) => {
        const layerId = layer.target.id;
        setMap.setStyle('mapbox://styles/mapbox/' + layerId);
    };
}

// geocoder controller

setMap.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: { color: "#c2c2c2", rotation: 45 }
    })
);

// event
let marker;
setMap.on('click', (e) => {
    const coordinates = e.lngLat;
    if (marker) {
        marker.setLngLat(coordinates);
    } else {
        marker = new mapboxgl.Marker({ color: "#22668D" })
            .setLngLat(coordinates)
            .addTo(setMap)
    }
    // update input fields with new coordinates
    document.getElementById("longitude").value = coordinates.lng;
    document.getElementById("latitude").value = coordinates.lat;
});