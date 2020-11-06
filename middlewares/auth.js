const verifyJWT = require('../jwtService/accessToken/verifyJWT');

module.exports = (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        return res.status(401).json({
            "error": {
                "msg": 'Token is invalid'
            }
        });
    }
    verifyJWT(token)
        .then(user => {
            req.user = user;
            next();
        }).catch(err => {
            res.status(401).json({
                "error": {
                    "msg": err
                }
            });
        });
}