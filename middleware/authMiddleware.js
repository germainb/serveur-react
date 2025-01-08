const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header.authorization.split(' ')[1];
   
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        console.log("token:"+token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
