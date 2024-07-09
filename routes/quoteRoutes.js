const express = require('express');
const { getQuote } = require('../controllers/quoteController');

const router = express.Router();

router.post('/', getQuote);

module.exports = router;
