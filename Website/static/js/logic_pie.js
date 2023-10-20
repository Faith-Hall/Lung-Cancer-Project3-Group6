// Store json url in variable
const url = "http://127.0.0.1:5000/raw-lung-cancer-data";

// Promise pending
const dataPromise = d3.json(url);
console.log("Data Promise:",dataPromise);

d3.json(url).then(function(data) {
    console.log(data);
  });

function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Use D3 to get sample names and populate the drop-down selector
    d3.json(url).then((data) => {
        
    // Empty list for states 
    let states = []

    // Loop to filter out the states
    data.forEach((state) => {
        console.log(states)
        state = state.LocationAbbr
        console.log(state)
        states.push(state)
    });
    console.log(states)

    states = states.filter((item, 
        index) => states.indexOf(item) === index);
        // Loop through states and append
        states.forEach((name) => {
            console.log(states);
            dropdownMenu.append("option").text(name).property("value",name);

            // create pie chart
            piechart = []
        });
    });
};

// Initialize
init();