require('dotenv').config();

const express = require('express');
const router = express.Router();

// Get URL schema
const UrlController = require('./controller/UrlController');

//
// POST
// @route POST /shorten
// @description Shorten a long url to a short url
// 
router.post('/api/shorten', UrlController.create);

//
// GET
// @route GET /:code
// @description Redirect short url to original
// 
router.get('/:code', UrlController.redirect);

module.exports = router;

