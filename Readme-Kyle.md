Used to import csv to SQlite
https://stackoverflow.com/questions/14947916/import-csv-to-sqlite
run: 
    sqlite3
    .open Project-3-Lung-Cancer.sqlite
    .import Project-3-Lung-Cancer.csv Data --csv


automap_base and prepare did not work.  
According to Stack overflow the reason these functions would not work was due to needing a primary key. 
https://stackoverflow.com/questions/23765681/sqlalchemy-automap-does-not-create-class-for-tables-without-primary-key

Added Primary Key column called id using DB Browser for SQLite. 

Added Flask project that serves data from SQLite DB as JSON. 
To use it run the flask-server.py and this url:
http://127.0.0.1:5000/api/v1.0/cancer