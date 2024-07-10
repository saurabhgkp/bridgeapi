const http = require('http');
const asyncMiddleware = require('./asyncMiddleware'); // Adjust the path as necessary

const getTokens = asyncMiddleware(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

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
            const tokens = JSON.parse(body.toString());

            // Implement pagination logic
            const paginatedTokens = tokens.slice(startIndex, endIndex);
            const totalTokens = tokens.length;
            const totalPages = Math.ceil(totalTokens / limit);

            res.status(200).json({
                page,
                limit,
                totalTokens,
                totalPages,
                tokens: paginatedTokens
            });
        });
    });

    apiReq.on('error', (error) => {
        res.status(500).json({ error: 'Failed to fetch tokens' });
    });

    apiReq.end();
});

module.exports = getTokens;
