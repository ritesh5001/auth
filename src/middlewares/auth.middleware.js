const jwt = require('jsonwebtoken');

async function authMiddleware(req, res, next) {
    const token = req.cookies && req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next();
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
}

module.exports = {
    authMiddleware,
};