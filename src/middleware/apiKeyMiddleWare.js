const validateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const validateApiKey = process.env.API_KEY;

    if (!apiKey) {
        return res.status(401).json({
            message: 'API key is missing'
        });
    }

    if (apiKey != validateApiKey) {
        return res.status(403).json({
            message: 'Invalid API key'
        });
    }
    next()
}

module.exports = { validateApiKey }