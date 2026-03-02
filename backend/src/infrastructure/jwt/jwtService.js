const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;

function generateToken(payload) {

  return jwt.sign(payload, SECRET_KEY);
}



function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token bulunamadı', code: "0x401" });
  }

  jwt.verify(token, SECRET_KEY, async (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Token geçersiz veya süresi dolmuş', code: "0x401" });
    }

    req.user = user;
    next();


  });
}

module.exports = { generateToken, authenticateToken };
