# Incidence of Lung and Bronchus Cancer in the United States (2015 - 2019)
<font size="3">**Group-Project-3: Team 6**  
**Contributors:** Kyle Dalton, Faith Hall, Thomas Keene, Cassia Yoon  
**Github link:** https://github.com/Faith-Hall/Lung-Cancer-Project3-Group6  
**Presentation link:** https://docs.google.com/presentation/d/1is7is2i6eAjvKeqRUmfpBk0Rcqw2cOpVEvVM5CwVK7U/edit?usp=sharing  
</font>  

# Project Overview  
In epidemiology, incidence is a measure of the probability of occurrence of a given medical condition in a population within a specified period of time.

The aim of this project is to explore the Centers for Disease Control and Prevention (CDC) cancer dataset to uncover potential incidence patterns of lung and bronchus cancer within the United States from 2015 through 2019. Here, we examine the relationships between demographic categories (race/ethnicity and gender), place of residence, and diagnoses of cancer derived from the data.

# Resources  
Dataset used:  
- Cancer dataset: https://data.cdc.gov/Chronic-Disease-Indicators/U-S-Chronic-Disease-Indicators-Cancer/u9ek-bct3  

Resources used for JS library Highcharts:
- https://www.highcharts.com/
- https://www.highcharts.com/demo/highcharts/bar-negative-stack
- https://api.highcharts.com/highcharts/

Resources used for interactive map:
- https://leafletjs.com
  
Tools:
- https://www.sqlite.org/index.html
- https://flask.palletsprojects.com/en/3.0.x/

# Data Preparation
The dataset "U.S. Chronic Disease Indicators: Cancer" was obtained from the Centers for Disease Control and Prevention (CDC) website (linked above) as a downloadable CSV file. Once downloaded, the data was prepared for subsequent analysis as follows:
- The raw CSV data was first filtered on "Question" to obtain only the records for "Cancer of the lung and bronchus, incidence"
- The dataset was then filtered on "YearStart" and "YearEnd" to obtain only those records for the time period of interest (2015 - 2019)
- The dataset was then filtered on "DataValueType" to obtain only those records for "Average Annual Number"
- The dataset was then cleaned by the removal of extraneous columns in order to leave only the columns of interest ("YearStart", "YearEnd", "LocationAbbr", "Question", "DataValueType", "DataValue", "DataValueAlt", "StratificationCategory1", "Stratification1", "LocationID", StratificationCategoryID1", and "StratificationID1")

Once filtered, sorted, and cleaned as described above, the csv file was then imported into a SQLite database.

Finally, Flask was employed to serve the data from the SQLite database as a JSON object.

# Visualizing the Data
To explore the dataset, the following visualizations were created:

Interactive map:
- The interactive map allows the user to obtain the data for the overall incidence of lung and bronchus cancer. To use the map, simply mouse over the state of interest, and observe the data displayed in the pop-up:

![Screenshot 2023-10-23 at 3 15 23 PM](https://github.com/Faith-Hall/Lung-Cancer-Project3-Group6/assets/137319054/c31fac0c-3e51-4053-9d3c-951bbb1fbb9a)

Interactive bar and pie charts:
- The 
  


# Acknowledgements
We wish to thank our teaching staff:
- Hunter Hollis
- Sam Espe
- Randy Sendek
- Kourt Bailey
