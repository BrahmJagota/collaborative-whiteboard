import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  console.log("verify called")
  const token = req.headers['authorization']?.split(' ')[1];
  console.log("verify token", token)
  if (!token) {
    console.log("verify no token")
    return res.status(401).send({ message: 'Access token is required' });
  }
  
  jwt.verify(token, JWT_SECRET, (err: VerifyErrors | null, decoded: any) => {
    if (err) {
      console.log("verify expire token")
      return res.status(401).send({ message: 'Invalid or expired access token' });
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
