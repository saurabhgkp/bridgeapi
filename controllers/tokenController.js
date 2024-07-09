const http = require('https');

const getTokens = (req, res) => {
    const options = {
        method: 'GET',
        hostname: 'binance43.p.rapidapi.com',
        port: null,
        path: '/ticker/24hr',
        headers: {
            'x-rapidapi-key': '88f5ff911amsh82df9cdf589359bp1a1113jsn0f0654fd9598',
            'x-rapidapi-host': 'binance43.p.rapidapi.com'
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
