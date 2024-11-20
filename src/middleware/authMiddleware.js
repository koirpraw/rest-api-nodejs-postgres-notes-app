const jwt = require('jsonwebtoken');
const Note = require('../model/note')

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
                message: `You do not have permission to perform this action. The ${req.user.role} role is restricted to only their own and public content. If this is error contact your administrator`
            });
        }
        next();
    }

}

const verifyNoteOwnerShip = (action) => {
    return async (req, res, next) => {
        try {
            const note = await Note.findById(req.params.id);

            if (!note.rows.length) {
                return res.status(404).json({
                    message: `Note not found`,
                })
            }
            if (note.rows[0].user_id === req.user.userId || req.user.role === 'admin') {
                next()
            } else {
                res.status(403).json({
                    message: `Not authorized to ${action} this note. Your role is ${req.user.role}`
                });
            }

        } catch (error) {
            res.status(500).json({
                message: `Error verifying note ownership`,
                error: error.message
            })

        }
    }


}

module.exports = {
    authenticateToken,
    authorizeRoles,
    verifyNoteOwnerShip
}