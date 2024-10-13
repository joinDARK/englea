import { verifyToken } from "../utils/jwtToken.js";

const checkUser = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next()
  }
  
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(403).json("Not Authorizate User")
    }
    
    const decoded = verifyToken({ token: token, secret: process.env.REFRESH_TOKEN_SECRET })
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

export { checkUser }