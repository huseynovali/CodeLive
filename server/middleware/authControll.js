const jwt = require('jsonwebtoken');

const authControll = (token, next) => {
    if (!token) {
        return next(new Error('Token not provided. Access denied.'));
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_KEY);
        if (decodedToken) {
            next();
        }


    } catch (error) {
        return next(new Error('Invalid token. Access denied.'));
    }
};

module.exports = authControll;
