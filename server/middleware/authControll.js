const jwt = require('jsonwebtoken');

const authControll = (token, next) => {
  if (!token) {
    return next(new Error('Token not provided. Access denied.'));
  }

  try {
    const decodedToken = jwt.verify(token, 'your_secret_key'); 

     next();   
   
  } catch (error) {
    return next(new Error('Invalid token. Access denied.'));
  }
};

module.exports = authControll;
