import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()

const generateAccessToken = ({ id, login, role }) => {
  const payload = {
    id,
    login,
    role
  }
  
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '24h'})
}

const generateRefreshToken = ({ id, login, role }) => {
  const payload = {
    id,
    login,
    role
  }
  
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '7d'})
}

const verifyToken = ({ token, secret }) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

export {generateAccessToken, generateRefreshToken, verifyToken}