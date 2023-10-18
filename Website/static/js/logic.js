// Store json url in variable
const url = "http://127.0.0.1:5000/api/v1.0/cancer"


// Use D3 library to fetch data
d3.json(url).then(function (data) {
    console.log(data)
});

// Bar chart 
// Trace 1 for gender cancer data 
let trace1 = {
    
}
