const http = require('https');
require("dotenv").config();
const getTokens = (req, res) => {

    const options = {
        method: 'GET',
        hostname: process.env.RapidApiHost,
        port: null,
        path: '/ticker/24hr',
        headers: {
            'x-rapidapi-key': process.env.RapidApiKey,
            'x-rapidapi-host': process.env.RapidApiHost
        }
    };

    const apiReq = http.request(options, function (apiRes) {
        const chunks = [];

        apiRes.on('data', function (chunk) {
            chunks.push(chunk);
        });

        apiRes.on('end', function () {
            const body = Buffer.concat(chunks);
            res.status(200).json(JSON.parse(body.toString()));
        });
    });

    apiReq.on('error', (error) => {
        res.status(500).json({ error: 'Failed to fetch tokens' });
    });

    apiReq.end();
};

module.exports = { getTokens };
