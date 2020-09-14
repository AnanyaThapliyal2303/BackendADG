var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/mydatabase';

const express = require('express');
var router = express.Router();
const app = express();

app.listen(4000, function() {
    console.log('listening on 4000');
});

app.get('/', function(req, res) {
    res.send("Yep it's working");
});


MongoClient.connect(url, function(err, db) {

    var cursor = db.collection('testcollection').find();

    cursor.each(function(err, doc) {

        console.log(doc);
    });

    app.get('/details', (req, res) => {
        cursor.toArray((err, results) => {
            if (err) {
                throw err;
            } else {
                res.send(results);
            }
        });
    });
});