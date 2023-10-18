// Store json url in variable
const url = "http://127.0.0.1:5000/raw-lung-cancer-data"

//define color function, based on density parameter.
function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}
//create a map color based on population density
function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'black',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

//define mouseout when moved off state
var geojson;
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    layer.bringToFront();
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight

    });
}
// Use D3 library to fetch data
d3.json(url).then(function (data) {
    console.log(data);
   
    console.log(statesData);

    geojson = L.geoJson(statesData, {style: style ,onEachFeature: onEachFeature} )

    //Create base Leaflet map
    let myMap = L.map("map", {
        center: [38.58, -99.58],
        zoom: 5,
        layers: [geojson]

    })
    //Create base tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreeMap</a> contributors'
    }).addTo(myMap);
   

});

