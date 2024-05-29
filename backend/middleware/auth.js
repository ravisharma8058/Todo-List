const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Auth Error' });
    }
    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.user = decoded;
        next();
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Invalid Token' });
    }
};

module.exports = auth;
