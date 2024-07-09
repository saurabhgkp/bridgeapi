const express = require('express');
const { getParams } = require('../controllers/paramController');

const router = express.Router();

router.post('/', getParams);

module.exports = router;
