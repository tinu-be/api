const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    clicks: {
        type: Number,
        default: 0
    },
    date: { 
        type: String,
        default: Date.now()
    }
});

module.exports = mongoose.model('Url', urlSchema);