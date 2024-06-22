import { Request, Router, Response } from "express";
import {compare, hash} from 'bcryptjs';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import UserModel from "../database/models";
const router = Router();
import { nanoid } from "nanoid";
import bodyParser from "body-parser";
import express from 'express';
import dotenv from 'dotenv';
import { verifyToken } from "../middleware/verify-token";
const app = express();
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
app.use(bodyParser.json());
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).send('Email already in use');
      }
      const boardId = nanoid();
      const user = new UserModel({ name, email, password, boardId });
      await user.save();
  
      const token = jwt.sign({ userId: user._id },JWT_SECRET, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ userId: user._id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
      res.status(201).json({ token,refreshToken, user });
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      const user = await UserModel.findOne({ email });
      if (!user || !(await user.checkPassword(password))) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }
  
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ userId: user._id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
      res.json({token, refreshToken, user});
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.post('/refresh-token', async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  try {
    if (!refreshToken) {
      return res.status(401).send({ message: 'Refresh token is required' });
    }

    jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err: VerifyErrors | null, decoded: any) => {
      if (err) {
        return res.status(403).send({ message: 'Invalid refresh token' });
      }

      const { userId } = decoded as  JwtPayload;
      const newToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token: newToken });
    });
  } catch (error) {
    res.status(500).send({ message: 'An internal server error occurred' });
  }
});
  router.post('/me', verifyToken,async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication token is missing' });
      }
    try{
      const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }
      const decoded = jwt.verify(token, JWT_SECRET);
      if (typeof decoded !== 'object' || !decoded.userId) {
        return res.status(400).json({ message: 'Invalid token' });
    }
      const {userId} = decoded; 
      const user = await UserModel.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    }
     catch (err) {
      res.status(500).json({message: "An error occurred."});
    }
  })
  
  export default router;