require('dotenv').config();

const express = require('express');
const connectDB = require('./database/db');
const routes = require('./routes');
const cors = require('cors');


const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN }));

// Connect Database
connectDB();

if(process.env.CUSTOM_ROOT_PATH) {
    app.use('/', express.static(__dirname + process.env.CUSTOM_ROOT_PATH));
}

app.use(express.json({ extended: false }));
app.use(routes);

app.listen(process.env.API_PORT || 5000);