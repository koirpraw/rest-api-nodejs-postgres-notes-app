const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const context = ({ req }) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        throw new AuthenticationError('No token provided');
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);
        return { user };
    } catch (error) {
        throw new AuthenticationError('Invalid token');
    }
};

module.exports = context;