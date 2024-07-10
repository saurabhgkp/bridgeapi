const request = require('supertest');
const app = require('./app');
const server = require('./server');

jest.mock('https', () => ({
    request: (options, callback) => {
        const { path } = options;

        const responseMap = {
            '/ticker/24hr': JSON.stringify([
                { id: 1, name: 'Bitcoin', symbol: 'BTC', current_price: 50000, market_cap: 1000000 },
                { id: 2, name: 'Ethereum', symbol: 'ETH', current_price: 3000, market_cap: 300000 }
            ]),
            '/exchangeInfo?symbol=ETHBTC': JSON.stringify({
                symbol: 'ETHBTC',
                price: 0.05
            })
        };

        const response = {
            on: (event, handler) => {
                if (event === 'data') {
                    handler(Buffer.from(responseMap[path]));
                }
                if (event === 'end') {
                    handler();
                }
            }
        };

        callback(response);

        return {
            on: () => { },
            end: () => { }
        };
    }
}));

describe('API Endpoints', () => {
    beforeAll(() => {
        // Start the server
    });

    afterAll(() => {
        // Close the server after tests
        server.close();
    });

    it('should fetch tokens', async () => {
        const res = await request(app).get('/tokens');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(2);
        expect(res.body[0].name).toBe('Bitcoin');
        expect(res.body[1].name).toBe('Ethereum');
    });

    it('should fetch quote for given symbol', async () => {
        const res = await request(app).post('/quotes').send({ symbol: 'ETHBTC' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.symbol).toBe('ETHBTC');
        expect(res.body.price).toBe(0.05);
    });

    it('should fetch params for given symbol', async () => {
        const res = await request(app).post('/params').send({ symbol: 'ETHBTC' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.symbol).toBe('ETHBTC');
        expect(res.body.price).toBe(0.05);
    });
});
