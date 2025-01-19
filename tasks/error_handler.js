const error_handler = (err, req, res, next) => {
    // write to console time, error message and place of the error
    console.error(`[${new Date().toISOString()}] Error: ${err.message}, Stack: ${err.stack}`);

    //checks if the error has status code
    const statusCode = err.statusCode || 500;

    const errorMessages = {
            400: 'Bad Request',
            401: 'Unauthorized',
            403: 'Forbidden',
            404: 'Not Found',
            405: 'Method Not Allowed',
            406: 'Not Acceptable',
            408: 'Request Timeout',
            409: 'Conflict',
            422: 'Unprocessable Entity',
            429: 'Too Many Requests',
            500: 'Internal Server Error',
            502: 'Bad Gateway',
            503: 'Service Unavailable',
            504: 'Gateway Timeout'
        };
    // choose error message or one of messages according to error status code
    const message = err.message || errorMessages[statusCode] || 'An unexpected error occurred';
    
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
    });
};
module.exports = error_handler;
