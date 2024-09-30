// initialize dependences by declaring it as a variable
const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const { connect } = require('http2');

app.use(express.json());
app.use(cors());
dotenv.config();


// connect to the database
const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });


// check if the db connections works
db.connect((err) => {
    // if the connection is not sucessfull
    if(err) 
        return console.log('Error connecting to database');

    // if connected
    console.log('Connected to mysql sucessfull as ID: ', db.threadID)

    // code goes here to share data
    // GET METHOD example

    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views'); //views is name of folder created

    // data is the name of the file in the view folder
    app.get('/data', (req,res) => {
        //retrieve data from database

        db.query('SELECT * FROM patients', (err, results) =>{
            if (err){
                console.profile(err);
                res.status(500).send('Error retrieving data'); 
            }else{
                // display the records on the browser

                res.render('data', { results: results });
            }
        });
    });


    app.listen(process.env.PORT, () =>{
        console.log(`Server listening on port ${process.env.PORT}`);

        //send a message to the browser
        console.log('Sending Message to browser... ');
        app.get('/', (req,res) => {
            res.send('Server started sucessfully!!')
        })
    })
});


// const express = require('express');
// const app = express();
// const mysql = require('mysql2');
// const dotenv = require('dotenv');
// const cors = require('cors');

// app.use(express.json());
// app.use(cors());
// dotenv.config();

// // connect to the database
// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// // check if the db connection works
// db.connect((err) => {
//     if (err) {
//         console.log('Error connecting to database', err);
//         return;
//     }

//     console.log('Connected to mysql successfully as ID: ', db.threadId);
// });

// // Set up EJS views
// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views'); // 'views' is the name of folder created

// // GET method example
// app.get('/data', (req, res) => {
//     // retrieve data from database
//     db.query('SELECT * FROM patients', (err, results) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).send('Error retrieving data');
//         }
//         // display the records on the browser
//         res.render('data', { results });
//     });
// });

// // Main route
// app.get('/', (req, res) => {
//     res.send('Server started successfully!!');
// });

// // Start the server
// app.listen(process.env.PORT, () => {
//     console.log(`Server listening on port ${process.env.PORT}`);
// });
