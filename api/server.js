const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

app.use(express.json({ extended: false }));
app.use('/api', () => { return { is: true}});

app.listen(5000 , () => {
    console.log('running');
});