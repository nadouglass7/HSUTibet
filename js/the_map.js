//----------------------
//Main map .js file:
//
//	This page controls the main map element of the page
//----------------------

//--------------
// Access token for mapbox.js api
//--------------
mapboxgl.accessToken = 'pk.eyJ1IjoibmRjYXJ0b2dyYXBoeSIsImEiOiJjamNqZ2pzd3A0MHE5MnFwNWI3dzg4bnRkIn0.Ee7m_Pgw3mn5ZS9JJT6rRQ';

//--------------
// Sets up the the map and it's styles
//--------------
var map = new mapboxgl.Map({
	container: 'map',
	center: [103,32.7845177], // uses [lon,lat]/[x,y]
	zoom: 3,
	minZoom: 2.7,
	maxZoom: 5,
	//style: 'mapbox://styles/mapbox/streets-v9'
	style: 'mapbox://styles/mapbox/outdoors-v9'
	//style: 'mapbox://styles/mapbox/satellite-streets-v9'
});

//--------------
// Adds controls like zoom and north arrpw
//--------------
map.addControl(new mapboxgl.NavigationControl());

//--------------
// Adds Layers:
//--------------
map.on("load", function() {

	// Add the source data to the map
    map.addSource("route-2000", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/ndcartography/HSUTibet/master/data/2000.geojson"

    });
    
    // Add the route-2000 to the map with styles
    map.addLayer({
        "id": "route-2000",
        "type": "line",
        "source": "route-2000",
        "paint": {
            "line-color": "#991bc6",
            "line-opacity": 0.6,
            "line-width": 2
        },
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
    });
});

//--------------
// Switch layers from nav tabs
//--------------
var layerList = document.getElementById('nav-tab');
var inputs = layerList.getElementsByTagName('a');

function switchLayer(layer) {
    var layerId = layer.target.id;
    map.addSource('route-' + layerId, {
        type: "geojson",
        data: "https://raw.githubusercontent.com/ndcartography/HSUTibet/master/data/" + layerId + ".geojson"
    });
    map.addLayer({
        "id": "route-" + layerId,
        "type": "line",
        "source": "route-" + layerId,
        "paint": {
            "line-color": "#991bc6",
            "line-opacity": 0.6,
            "line-width": 2
        },
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
    });
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}