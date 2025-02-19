export const errorHandler = (err, req, res, next) => {
    console.error('API Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};