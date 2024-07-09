const express = require('express');
const { getTokens } = require('../controllers/tokenController');
const router = express.Router();

router.get('/', getTokens);

module.exports = router;