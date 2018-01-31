//----------------------
//Main map .js file:
//
//	This page controls the main map element of the page
//----------------------

// Access token for mapbox.js api
mapboxgl.accessToken = 'pk.eyJ1IjoibmRjYXJ0b2dyYXBoeSIsImEiOiJjamNqZ2pzd3A0MHE5MnFwNWI3dzg4bnRkIn0.Ee7m_Pgw3mn5ZS9JJT6rRQ';




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

//var BoxZoomHandler = new BoxZoomHandler(map: Map)
//map.boxZoom.enable();
map.addControl(new mapboxgl.NavigationControl());

map.on("load", function() {
    map.addSource("route-2000", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/ndcartography/HSUTibet/master/data/2000.geojson"

    });
    
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
        //"filter": ["==", "$type", "Polygon"]
    });
});