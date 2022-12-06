const express = require('express');
const { connectDb } = require('./config/dbconfig');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 4000;
const route = require('./app/route');

// parse requests
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

app.listen(PORT, () =>{
    console.log('server conneted on port', PORT);
});

connectDb();

route.routeToController(app);
module.exports = app;