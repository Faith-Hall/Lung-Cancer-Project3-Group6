// Store json url in variable
const url = "http://127.0.0.1:5000/raw-lung-cancer-data"


// Use D3 library to fetch data
d3.json(url).then(function (data) {
    console.log(data)
    //Create base Leaflet map
    let myMap = L.map("map", {
        center: [38.58, -99.58],
        zoom: 5



    })
    //Create base tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreeMap</a> contributors'
    }).addTo(myMap)

});

