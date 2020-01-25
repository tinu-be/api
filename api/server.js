const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors());

// Connect Database
connectDB();

app.use(express.json({ extended: false }));
app.use(routes);

app.listen(5000 , () => {
    console.log('running');
});