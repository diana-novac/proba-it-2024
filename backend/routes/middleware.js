const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authorizationHeader = req.header('Authorization');
    let token = '';

    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        token = authorizationHeader.substring(7);
    }

    if (!token) {
        return res.status(401).json({message : 'Authentication required!'});
    }

    try {
        const decoded = jwt.verify(token, 'secret_key');
        req.userId = decoded.userId;
        next();
    } catch(err) {
        return res.status(401).json({message : 'Invalid token!'});
    }
};

module.exports = authMiddleware;
