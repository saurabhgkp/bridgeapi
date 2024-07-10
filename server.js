const app = require('./app');
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
    console.log(`Server Running on Port: http://localhost:${PORT}`);
});

module.exports = server;