
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
244
245
246
247
248
249
250
251
252
253
254
255
256
257
258
259
260
261
262
263
264
265
266
267
268
269
270
271
272
273
274
275
276
277
278
279
280
281
282
283
284
285
286
287
288
289
290
291
292
293
294
295
296
297
298
299
300
301
302
303
304
305
306
307
308
309
310
311
312
313
314
315
316
317
318
319
320
321
322
323
324
325
326
327
328
329
330
331
332
333
334
335
336
337
338
339
340
341
342
343
344
345
346
347
348
349
350
351
352
353
354
355
356
357
358
359
360
361
362
363
364
365
366
367
368
369
370
371
372
373
374
375
376
377
378
379
380
381
382
383
384
385
386
387
388
389
390
391
392
393
394
395
396
397
398
399
400
401
402
403
404
405
406
407
408
409
410
411
412
413
414
415
416
417
418
419
420
421
422
423
424
425
426
427
428
429
430
431
432
433
434
435
436
437
438
439
440
441
442
443
444
445
446
447
448
449
450
451
452
453
454
455
456
457
458
459
460
461
462
463
464
// Store json url in variable
const url = "http://127.0.0.1:5000/raw-lung-cancer-data";

// Promise Pending
const dataPromise = d3.json(url);
//  //  console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  //  //  console.log(data);
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
          //  //  //  console.log(states)
          state = state.LocationAbbr
          //  //  //  console.log(state)
          states.push(state)
      });
      //  //  //  console.log(states)

      // Remove the duplicates from the list of state abbreviations
      states = states.filter((item,
          index) => states.indexOf(item) === index);
          //  //  //  console.log(states)
      
      // Loop through the "states" array and append each state abbreviation to the dropdown menu
      states.forEach((state) => {
          dropdownMenu.append("option").text(state).property("value", state);
      });

      // Empty list for holding stratifications
      let strats = []

      // Loop to get the stratifications
      data.forEach((strat) => {
          //  //  console.log(strats)
          strat = strat.Stratification1
          //  //  console.log(strat)
      });

      // Empty list for holding the stratification values
      let stratValues = []

      // Loop to get the Data Value for each stratification
      data.forEach((stratValue) => {
          //  //  console.log(stratValues)
          stratValue = stratValue.DataValue
          //  //  console.log(stratValue)
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
      //  //  console.log(filteredValues)

      DataValues = []
      Stratifications = []

      // Loop to get the stratifications
      filteredValues.forEach((value) => {
          //  //  console.log(value)
          //  //  console.log(value.Stratification1)
          //  //  console.log(value.DataValue)
          DataValues.push(value.DataValue)
          Stratifications.push(value.Stratification1)
      });
      //  //  console.log(DataValues, Stratifications)




      // // Assign the first value
      // let obj = filteredValues[0];

      // Get the Stratifications and Data Values
      // let Stratification1= obj.Stratification1;
      // let DataValue = obj.DataValue;
      
      // Log the data to the console
      // //  //  console.log(Stratification1, DataValue);

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
      //  //  console.log(filteredValues)

      DataValues = []
      Stratifications = []

      // Loop to get the stratifications
      filteredValues.forEach((value) => {
          //  //  console.log(value)
          //  //  console.log(value.Stratification1)
          //  //  console.log(value.DataValue)
          DataValues.push(value.DataValue)
          Stratifications.push(value.Stratification1)
      });
      //  //  console.log(DataValues, Stratifications)
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

          let maleValues = stateData.filter(state => state.Stratification1 === "Male");
        console.log(maleValues)
        console.log(states)

        let femaleValues = stateData.filter(state => state.Stratification1 === "Female");
        console.log(femaleValues)

        f_Values = []
        m_Values = []

        // Loop to get the stratifications
        maleValues.forEach((value) => {
            m_Values.push(-parseInt(value.DataValue, 10))
        });

      femaleValues.forEach((value) => {
          f_Values.push(parseInt(value.DataValue, 10))
      });
      
      //  //  console.log(m_Values)
      //  //  console.log(f_Values)

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
                text: 'lung canc......',
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
    });
};

// Create a Function that updates the dashboard when the state is changed
function optionChanged(selectedState) { 

  // Log the new value
  //  //  console.log(selectedState); 

  // Call all functions
  barChart(selectedState);
};

// Initialize
init();

//Create variable named url which points to url (website)  
//THIS WEBSITE CONTAINS YOUR CANCER DATA
//Contains cases by state, then by gender or race from 2015-2019

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
