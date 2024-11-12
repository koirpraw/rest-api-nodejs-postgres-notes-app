const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication required' })
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
        // jwt.verify(token, JWT_SECRET, (err, user) => {
        //     if (err) {
        //         return res.status(403).json({ message: 'Invalid token or expired' })
        //     }
        //     req.user = user;
        //     next();
        // })


    } catch (error) {
        res.status(403).json({ message: 'Invalid token' })
    }

};

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'You do not have permission to perform this action'
            });
        }
        next();
    }

}

module.exports = {
    authenticateToken,
    authorizeRoles
}