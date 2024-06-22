import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken';


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const JWT_SECRET = process.env.JWT_SECRET as string;
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).send({ message: 'Access token is required' });
  }
  
  jwt.verify(token, JWT_SECRET, (err: VerifyErrors | null, decoded: any) => {
    if (err) {
      return res.status(401).send({ message: 'Invalid or expired access token' });
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
