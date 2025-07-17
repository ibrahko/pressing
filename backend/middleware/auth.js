const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'Pas de token, autorisation refusée' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, 'jwtSecret'); // Replace with a real secret
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Le token n\'est pas valide' });
  }
};
