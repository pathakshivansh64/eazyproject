const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const bearertoken = req.header('Authorization');
    if (!bearertoken) return res.status(401).json({ error: 'Access denied' });

    try {
        
        const token = bearertoken.split(' ')[1];
     
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        
        res.status(400).json({ error: 'Invalid token' });
    }
};
