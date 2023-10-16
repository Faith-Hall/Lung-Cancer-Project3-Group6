Used to import csv to SQlite
https://stackoverflow.com/questions/14947916/import-csv-to-sqlite
run: 
    sqlite3
    .open Project-3-Lung-Cancer.sqlite
    .import Project-3-Lung-Cancer.csv Data --csv
    
