const jwt = require('jsonwebtoken');

const jwtSecretString = 'kff;jd%@#$%@$dffadf%@$#%#GSDFGDgd';

module.exports = token => {
    return new Promise((resolve, reject) => {
        if (!token.startsWith('Bearer')) {
            // Reject if there is no Bearer in the token
            return reject('Token is invalid');
        }
        // Remove Bearer from string
        token = token.slice(7, token.length);
        jwt.verify(token, jwtSecretString, (err, decodedToken) => {
            if (err) {
                return reject(err.message);
            }   // Check the decoded user
            if (!decodedToken || !decodedToken.user) {
                return reject('Token is invalid');
            }
            resolve(decodedToken.user);
        })
    });
}   