
mapboxgl.accessToken = 'pk.eyJ1Ijoia2FqYWwtbWlzaHJhLTI5IiwiYSI6ImNseXNmMDllNTA0NTgyd3NncGYxcTVlbjUifQ.Pcn6dwnVj1juQT7l7m9pHA';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: [-74.5, 40], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});