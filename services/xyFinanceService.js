const axios = require('axios');

const COINGECKO_API_BASE_URL = 'https://api.coingecko.com/api/v3';

// Function to fetch tokens
const fetchTokens = async () => {
    const response = await axios.get(`${COINGECKO_API_BASE_URL}/coins/list`);
    return response.data;
};

// Function to fetch quotes
const fetchQuote = async (token, chain) => {
    const response = await axios.get(`${COINGECKO_API_BASE_URL}/simple/price`, {
        params: {
            ids: token,
            vs_currencies: chain,
        },
    });
    return response.data;
};

// Function to fetch transaction parameters (if applicable)
const fetchTransactionParams = async (quote) => {
    // Implement based on specific requirements of the transaction parameters
    return { quote }; // Dummy return, replace with actual implementation
};

module.exports = { fetchTokens, fetchQuote, fetchTransactionParams };
