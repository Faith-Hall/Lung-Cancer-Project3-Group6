// Store json url in variable
const url = "http://127.0.0.1:5000/raw-lung-cancer-data";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
});

// Initialize the dashboard and plots
function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select('#selDataset');

    // Use D3 to get the state abbreviations for populating the dropdown selections
    d3.json(url).then((data) => {

        // Create an open list to hold the state abbreviations
        let states = [];

        // Loop through the data to filter out the states
        data.forEach((state) => {
            console.log(states)
            state = state.LocationAbbr
            console.log(state)
            states.push(state)
        });
        console.log(states)

        // Remove the duplicates from the list of state abbreviations
        states = states.filter((item,
            index) => states.indexOf(item) === index);
            console.log(states)
        
        // Loop through the "states" array and append each state abbreviation to the dropdown menu
        states.forEach((state) => {
            dropdownMenu.append("option").text(state).property("value", state);
        });

        // Empty list for holding stratifications
        let strats = []

        // Loop to get the stratifications
        data.forEach((strat) => {
            console.log(strats)
            strat = strat.Stratification1
            console.log(strat)
        });

        // Empty list for holding the stratification values
        let stratValues = []

        // Loop to get the Data Value for each stratification
        data.forEach((stratValue) => {
            console.log(stratValues)
            stratValue = stratValue.DataValue
            console.log(stratValue)
        });

        // Assign the first state name to a variable
        let first_state_name  = states[0];

        // Create the names for the functions that will be used (Bar Chart)
        barChart(first_state_name);
    });
};


// BarChart Function
function barChart(selectedState) {

    // Fetch all of the data using D3
    d3.json(url).then((data) => {

        // Retreive the sample data
        let stateData = data;

        // Filter the state data based on the state location abbreviation
        let filteredValues = stateData.filter(state => state.LocationAbbr === selectedState && state.StratificationCategoryID1 === "RACE");
        console.log(filteredValues)

        DataValues = []
        Stratifications = []

        // Loop to get the stratifications
        filteredValues.forEach((value) => {
            console.log(value)
            console.log(value.Stratification1)
            console.log(value.DataValue)
            DataValues.push(value.DataValue)
            Stratifications.push(value.Stratification1)
        });
        console.log(DataValues, Stratifications)




        // // Assign the first value
        // let obj = filteredValues[0];

        // Get the Stratifications and Data Values
        // let Stratification1= obj.Stratification1;
        // let DataValue = obj.DataValue;
        
        // Log the data to the console
        // console.log(Stratification1, DataValue);

       // Use Plotly to create the bar chart
        // Plotly.newPlot('bar', [trace], layout)
        var data = [
            {
              x: Stratifications,
              y: DataValues,
              type: 'bar'
            }
          ];
          
        Plotly.newPlot('bar', data);
        // Pie
        // Filter the state data based on the state location abbreviation
        filteredValues = stateData.filter(state => state.LocationAbbr === selectedState && state.StratificationCategoryID1 === "GENDER");
        console.log(filteredValues)

        DataValues = []
        Stratifications = []

        // Loop to get the stratifications
        filteredValues.forEach((value) => {
            console.log(value)
            console.log(value.Stratification1)
            console.log(value.DataValue)
            DataValues.push(value.DataValue)
            Stratifications.push(value.Stratification1)
        });
        console.log(DataValues, Stratifications)
        var data = [{
            values: DataValues,
            labels: Stratifications,
            type: 'pie'
          }];
          
          var layout = {
            height: 400,
            width: 500
          };
          
          Plotly.newPlot('pie', data, layout);
    });
};




// Create a Function that updates the dashboard when the state is changed
function optionChanged(selectedState) { 

    // Log the new value
    console.log(selectedState); 

    // Call all functions
    barChart(selectedState);
};

// Initialize
init();