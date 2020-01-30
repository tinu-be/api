require('dotenv').config();

const validUrl = require('valid-url');
const shortid = require('shortid');
const Url = require('../models/Url');

module.exports = {
    // Store URL wiith custom id or generate one
    async create(req, res) {
        const { longUrl, customID } = req.body;
        const baseURL = process.env.BASE_URL;

        // Check Base Url
        if(!validUrl.isUri(baseURL)) {
            return res.status(401).json('Invalid base url');
        }

        // Create url code
        const urlCode = customID ? customID : shortid.generate();

        // Check longurl
        if (validUrl.isUri(longUrl)) {
            try {
                let url = await Url.findOne({ urlCode: customID });
                
                if(url) {
                    res.status(208).json('The suffix is already in use');
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
            } catch (err) {
                console.error(err);
                res.status(500).json('Server error');
            }
        } else {
            res.status(401).json('Invalid long url');
        }
    },

    // Redirect user when access url shorten
    async redirect(req, res) {
        try {
            const url = await Url.findOne({ urlCode: req.params.code });

            if(url) {
                // Save access as a click into url collection
                url.updateOne({ id: url._id}, { clicks: url.clicks++});
                url.save();
                
                return res.redirect(url.longUrl);
            } else {
                return res.status(404).json('No url found');
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server error');
        }
    },

    // Get all url data from collection to show as stat
    async stats(req, res) {
        try {
            const url = await Url.findOne({ urlCode: req.params.code });

            if(url) {
                return res.json(url);
            } else {
                return res.status(404).json('No url found');
            }
        } catch(err) {
            console.error(err);
            res.status(500).json('Server error');
        }
    }
};