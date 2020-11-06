const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const jwtSecretString = 'kff;jd%@#$%@$dffadf%@$#%#GSDFGDgd';

module.exports = payload => {
    payload.uuid = uuid.v4();
    return jwt.sign({ user: payload }, jwtSecretString, { expiresIn: '60min' });
}