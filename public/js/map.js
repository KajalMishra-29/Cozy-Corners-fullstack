mapboxgl.accessToken = mapToken;

const renderMapWithCoordinates = async (coordinates) => {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [coordinates.longitude, coordinates.latitude],
        zoom: 7
    });

    // Add fullscreen control
    map.addControl(new mapboxgl.FullscreenControl());

    // Create and add the marker
    new mapboxgl.Marker({ color: "#22668D" })
        .setLngLat([coordinates.longitude, coordinates.latitude])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<b>${city}, ${state}${country}</b>`))
        .addTo(map);

    // styles of map
    const layerList = document.getElementById('menu');
    const inputs = layerList.getElementsByTagName('input');
    for (const input of inputs) {
        input.onclick = (layer) => {
            const layerId = layer.target.id;
            map.setStyle('mapbox://styles/mapbox/' + layerId);
        };
    }
}

const getCoordinates = async (city, state, country) => {
    const location = `${city}, ${state}, ${country}`;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${mapboxgl.accessToken}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.features.length === 0) {
            console.log("No location found");
            return null;
        };
        let longitude = data.features[0].center[0];
        let latitude = data.features[0].center[1];
        return { longitude, latitude };
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        return null;
    }
}

// 1. Check if original coordinates are available and render map accordingly
(async function () {
    if (geometry.coordinates.length != 0) {
        // 2. Render map with original coordinates
        let coordinates = { longitude: geometry.coordinates[0], latitude: geometry.coordinates[1] };
        renderMapWithCoordinates(coordinates);
    } else {
        // 3. Fetch coordinates using geocoding
        let coordinates = await getCoordinates(city, state, country);
        if (!coordinates) {
            // 4. Fallback to New Delhi if geocoding fails
            coordinates = { longitude: 77.2090, latitude: 28.6139 };
        }
        renderMapWithCoordinates(coordinates);
    }
})();
