require('dotenv').config();

const mongoose = require('mongoose');
const db = process.env.DATABASE_HOST;

const connectDB = async() => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB Connected!');  
    } catch(err) {
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;