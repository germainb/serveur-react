const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    //const token = req.headers.authorization.split(' ')[1];

    let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    console.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    token = req.headers.authorization.split('Bearer ')[1];
  } else if(req.cookies) {
    console.log('Found "__session" cookie');
    // Read the ID Token from cookie.
    token = req.cookies.__session;
  }

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
