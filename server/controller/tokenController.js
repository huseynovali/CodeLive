const jwt = require('jsonwebtoken');

const tokenController = async (req, res) => {
  const { token } = req.body;
console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not found' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_KEY);
    if(decodedToken)
      res.json(true);
    
    
  } catch (err) {

    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = tokenController;
