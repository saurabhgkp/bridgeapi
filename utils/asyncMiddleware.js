

const asyncMiddleware = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (ex) {
            next(ex); // Pass the error to the global error handler
        }
    };
};

module.exports = asyncMiddleware;