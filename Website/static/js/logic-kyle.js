//Create variable named url which points to url (website)  
//THIS WEBSITE CONTAINS YOUR CANCER DATA
//Contains cases by state, then by gender or race from 2015-2019
const url = "http://127.0.0.1:5000/raw-lung-cancer-data"

//define color function, based on density parameter.
function getColor(d) {
    return d > 10000 ? '#800026' :
           d > 8000  ? '#BD0026' :
           d > 6000  ? '#E31A1C' :
           d > 4000  ? '#FC4E2A' :
           d > 2000   ? '#FD8D3C' :
           d > 1000   ? '#FEB24C' :
           d > 500   ? '#FED976' :
                      '#FFEDA0';
}

function getStateAbbr(stateName) {
    return stateName == "Alabama" ? "AL":
           stateName == "Alaska"  ? "AK":
           stateName == "Arizona"  ? "AZ":
           stateName == "Arkansas"  ? "AR":
           stateName == "California"  ? "CA":
           stateName == "Colorado"  ? "CO":
           stateName == "Connecticut"  ? "CT":
           stateName == "Delaware"  ? "DE":
           stateName == "Florida"  ? "FL":
           stateName == "Georgia"  ? "GA":
           stateName == "Hawaii"  ? "HI":
           stateName == "Idaho"  ? "ID":
           stateName == "Illinois"  ? "IL":
           stateName == "Indiana"  ? "IN":
           stateName == "Iowa"  ? "IA":
           stateName == "Kansas"  ? "KS":
           stateName == "Kentucky"  ? "KY":
           stateName == "Louisiana"  ? "LA":
           stateName == "Maine"  ? "ME":
           stateName == "Maryland"  ? "MD":
           stateName == "Massachusetts"  ? "MA":
           stateName == "Michigan"  ? "MI":
           stateName == "Minnesota"  ? "MN":
           stateName == "Mississippi"  ? "MS":
           stateName == "Missouri"  ? "MO":
           stateName == "Montana"  ? "MT":
           stateName == "Nebraska"  ? "NE":
           stateName == "Nevada"  ? "NV":
           stateName == "New Hampshire"  ? "NH":
           stateName == "New Jersey"  ? "NJ":
           stateName == "New Mexico"  ? "NM":
           stateName == "New York"  ? "NY":
           stateName == "North Carolina"  ? "NC":
           stateName == "North Dakota"  ? "ND":
           stateName == "Ohio"  ? "OH":
           stateName == "Oklahoma"  ? "OK":
           stateName == "Oregon"  ? "OR":
           stateName == "Pennsylvania"  ? "PA":
           stateName == "Rhode Island"  ? "RI":
           stateName == "South Carolina"  ? "SC":
           stateName == "South Dakota"  ? "SD":
           stateName == "Tennessee"  ? "TN":
           stateName == "Texas"  ? "TX":
           stateName == "Utah"  ? "UT":
           stateName == "Vermont"  ? "VT":
           stateName == "Virginia"  ? "VA":
           stateName == "Washington"  ? "WA":
           stateName == "West Virginia"  ? "WV":
           stateName == "Wyoming"  ? "WY":
           stateName == "District of Columbia"  ? "DC":
           stateName == "Wisconsin"  ? "WI":
           stateName == "Puerto Rico"  ? "PR":
           stateName;





}

//create a map color based on population density
function kyle_custom_style(feature) {
    let stateAbbr = getStateAbbr(feature.properties.name);
    // console.log(stateAbbr);

    let stateData = cancerData.filter( function(record){
        return record.LocationAbbr == stateAbbr && record.Stratification1 == "Overall";
    });
    
    let overallCancerInc = stateData[0].DataValue;
    // console.log(overallCancerInc);

    return {
        fillColor: getColor(overallCancerInc),
        weight: 2,
        opacity: 1,
        color: 'black',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

//define mouseover when moved on state
var geojson;
var cancerData;
function highlightFeature(e) {
       var layer = e.target;
       

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    layer.bringToFront();
    info.update(layer.feature.properties);
}
//define mouseoff when moved off state
function resetHighlight(e) {
    
    geojson.resetStyle(e.target);
    info.update();
}

function kyle_custom_features(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight

    });
}
// custom info control code to see incidences, by state overal incidences
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a  "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {

    let overallCancerInc;

    if(props){
        let stateAbbr = getStateAbbr(props.name);
        // console.log(stateAbbr);
    
        let stateData = cancerData.filter( function(record){
            return record.LocationAbbr == stateAbbr && record.Stratification1 == "Overall";
        });
        
        overallCancerInc = stateData[0].DataValue;
        // console.log(overallCancerInc);
    }


    this._div.innerHTML = '<h4>Overall Lung Cancer Incidences by State</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + overallCancerInc + ' Overall'
        : 'Hover over a state');
        // console.log(props);
};


// Use D3 library to fetch data from the url variable



d3.json(url).then(function (data) {
    // console.log(data);
    cancerData = data;
   
    // console.log(statesData);
    statesData.features = statesData.features.filter( function(state){
        return state.properties.name != "Puerto Rico";
    });

    geojson = L.geoJson(statesData, {style: kyle_custom_style ,onEachFeature: kyle_custom_features} )

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
   

    info.addTo(myMap);
});
