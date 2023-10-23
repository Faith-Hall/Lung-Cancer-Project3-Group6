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

    // // Use D3 to select the dropdown menu
    // let dropdownMenu = d3.select('#selDataset');

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
// function barChart(selectedState) {

//     // Fetch all of the data using D3
//     d3.json(url).then((data) => {

//         // Retreive the sample data
//         let stateData = data;

//         // Filter the state data based on the state location abbreviation
//         let filteredValues = stateData.filter(state => state.LocationAbbr === selectedState && state.StratificationCategoryID1 === "RACE");
//         console.log(filteredValues)

//         DataValues = []
//         Stratifications = []

//         // Loop to get the stratifications
//         filteredValues.forEach((value) => {
//             console.log(value)
//             console.log(value.Stratification1)
//             console.log(value.DataValue)
//             DataValues.push(value.DataValue)
//             Stratifications.push(value.Stratification1)
//         });
//         console.log(DataValues, Stratifications)

//         var data = [
//             {
//               x: Stratifications,
//               y: DataValues,
//               type: 'bar'
//             }
//           ];
          
//         Plotly.newPlot('bar', data);
//     });
// };

// // Create a Function that updates the dashboard when the state is changed
// function optionChanged(selectedState) { 

//     // Log the new value
//     console.log(selectedState); 

//     // Call all functions
//     barChart(selectedState);
// };

// HIGHCHARTS:

// Custom template helper
Highcharts.Templating.helpers.abs = value => Math.abs(value);

// Age categories
const categories = states;

Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Population pyramid for Somalia, 2021',
        align: 'left'
    },
    subtitle: {
        text: 'Source: <a ' +
            'href="https://countryeconomy.com/demography/population-structure/somalia"' +
            'target="_blank">countryeconomy.com</a>',
        align: 'left'
    },
    accessibility: {
        point: {
            valueDescriptionFormat: '{index}. Age {xDescription}, {value}%.'
        }
    },
    xAxis: [{
        categories: categories,
        reversed: false,
        labels: {
            step: 1
        },
        accessibility: {
            description: 'Age (male)'
        }
    }, { // mirror axis on right side
        opposite: true,
        reversed: false,
        categories: categories,
        linkedTo: 0,
        labels: {
            step: 1
        },
        accessibility: {
            description: 'Age (female)'
        }
    }],
    yAxis: {
        title: {
            text: null
        },
        labels: {
            format: '{abs value}%'
        },
        accessibility: {
            description: 'Percentage population',
            rangeDescription: 'Range: 0 to 5%'
        }
    },

    plotOptions: {
        series: {
            stacking: 'normal',
            borderRadius: '50%'
        }
    },

    tooltip: {
        format: '<b>{series.name}, age {point.category}</b><br/>' +
            'Population: {(abs point.y):.1f}%'
    },

    series: [{
        name: 'Male',
        data: m_Values
    }, {
        name: 'Female',
        data: f_Values
    }]
});

// Initialize
init();