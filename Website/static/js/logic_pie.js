// Store json url in variable
const url = "http://127.0.0.1:5000/raw-lung-cancer-data";

// Promise pending
const dataPromise = d3.json(url);
console.log(states);

d3.json(url).then(function(data) {
    console.log(data);
  });

function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Use D3 to get sample names and populate the drop-down selector
    d3.json(url).then((data) => {
        
        // Set a variable for the state names
        let states = [];

        // Add samples to dropdown menu
        states.forEach((name) => {
            console.log(states);
            dropdownMenu.append("option").text(name).property("value",name);
        });
    });
};

