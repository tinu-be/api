const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

// Get URL schema
const Url = require('./models/Url');

//
// POST
// @route POST /shorten
// @description Shorten a long url to a short url
// 
router.post('/api/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const baseURL = config.get('baseURL');

    // Check Base Url
    if(!validUrl.isUri(baseURL)) {
        return res.status(401).json('Invalid base url');
    }

    // Create url code
    const urlCode = shortid.generate();

    // Check longurl
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });

            if(url) {
                res.json(url);
            } else {
                const shortUrl = baseURL + '/' + urlCode;
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();
                res.json(url);
            }
        } catch (error) {
            console.error(err);
            res.status(500).json('Server error');
        }
    } else {
        res.status(401).json('Invalid long url');
    }
    
});

//
// GET
// @route GET /:code
// @description Redirect short url to original
// 
router.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code });

        if(url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json('No url found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});

module.exports = router;

