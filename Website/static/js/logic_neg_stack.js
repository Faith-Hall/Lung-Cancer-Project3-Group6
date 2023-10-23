// Store json url in variable
const url = "http://127.0.0.1:5000/raw-lung-cancer-data";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
});

let states = [];

// Initialize the dashboard and plots
function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select('#selDataset');

    // Use D3 to get the state abbreviations for populating the dropdown selections
    d3.json(url).then((data) => {

        // Create an open list to hold the state abbreviations
        states = [];

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
        
        // data manipulation for neg-stack chart
        // sorting data by state abbr alphabetical order   
        let sortedData = stateData.sort(function(x, y){
            return d3.ascending(x.LocationAbbr, y.LocationAbbr);
        });
        // separating US from the data
        usData = sortedData.filter(obj => obj.LocationAbbr === "US")
        sortedData = sortedData.filter(obj => obj.LocationAbbr !== "US")
        console.log(usData);
        console.log(sortedData);

        // Create an open list to hold the state abbreviations
        statesB = [];
        // Loop through the data to filter out the states
        sortedData.forEach((state) => {
            state = state.LocationAbbr
            statesB.push(state);
        });
        // Remove the duplicates from the list of state abbreviations
        statesB = statesB.filter((item,
            index) => statesB.indexOf(item) === index);
        
        console.log(statesB);
        
        // filter male and female data
        let maleValues = sortedData.filter(state => state.Stratification1 === "Male");
        console.log(maleValues)
        
        let femaleValues = sortedData.filter(state => state.Stratification1 === "Female");
        console.log(femaleValues)

        // creating empty arrays
        f_Values = []
        m_Values = []

        // Loop to get the male and female values and push to the above arrays
        maleValues.forEach((value) => {
            m_Values.push(-parseInt(value.DataValue, 10)) // *(-1)to be on the left side of axis
        });

        femaleValues.forEach((value) => {
            f_Values.push(parseInt(value.DataValue, 10))
        });
        
        console.log(m_Values)
        console.log(f_Values)

        // HIGHCHARTS template: negative stack chart:
        Highcharts.Templating.helpers.abs = value => Math.abs(value);

        // state categories
        const categories = statesB;

        Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            legend: {
                itemStyle: {
                    fontSize: '15px'
                }
            },
            title: {
                text: 'Distribution of the Average Annual Incidence of Cancer of the Lung and Bronchus per 100,000 by Gender and State',
                align: 'left',
                style: {
                    fontSize:'20px'
                }
            },
            xAxis: [{
                categories: categories,
                reversed: false,
                labels: {
                    step: 1,
                    style: {
                        fontSize:'15px'
                    }
                }
            }, { // mirror axis on right side
                opposite: true,
                reversed: false,
                categories: categories,
                linkedTo: 0,
                labels: {
                    step: 1,
                    style: {
                        fontSize:'15px'
                    }
                }
            }],
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    format: '{abs value}',
                    style: {
                        fontSize:'15px'
                    }
                }
            },

            plotOptions: {
                series: {
                    stacking: 'normal',
                    borderRadius: '50%',
                    groupPadding: 0,
                    pointPadding: 0
                }
            },

            tooltip: {
                format: '<b>{series.name}, {point.category}</b><br/>' +
                    'Cancer Incidence: <b>{(abs point.y):.1f}</b> per 100,000',
                style: {
                    fontSize:'13px'
                }
            },

            series: [{
                name: 'Male',
                data: m_Values,
                color: 'rgb(255, 127, 14)',
            }, {
                name: 'Female',
                data: f_Values,
                color: 'rgb(31, 119, 180)'
            }],

            exporting: {
                enabled: false
            }
        });
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