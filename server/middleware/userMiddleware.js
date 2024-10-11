import jwt from "jsonwebtoken"
import { generateAccessToken, verifyToken } from "../utils/jwtToken.js";

const refreshTokens = [];

const checkUser = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next()
  }
  
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(403).json("Not Authorizate User")
    }
    
    const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    if (!decoded) {
      return res.status(403).json({ message: 'Invalid or expired access token' });
    }
    
    req.user = decodedData
    next()
  } catch(e) {
    console.log(e)
    return res.status(403).json("Not Authorizate User")
  }
};

const refreshToken = ({ token }) => {
  if (req.method === "OPTIONS") {
    next()
  }
  
  if (!token || !refreshTokens.includes(token)) {
      return res.status(403).json({ message: 'Invalid refresh token' })
  }

  const decoded = verifyToken({ token: token, secret: process.env.REFRESH_TOKEN_SECRET })
  if (!decoded) {
      return res.status(403).json({ message: 'Invalid or expired refresh token' })
  }

  const user = { id: decoded.id, login: decoded.login, role: decoded.role }
  const newAccessToken = generateAccessToken(user)

  req.user = newAccessToken
  next()
};

export { checkUser, refreshToken }