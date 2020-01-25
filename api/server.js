const express = require('express');

const app = express();

app.use(express.json({ extended: false }));
app.use('/api', () => { return { is: true}});

app.listen(5000 , () => {
    console.log('running');
});