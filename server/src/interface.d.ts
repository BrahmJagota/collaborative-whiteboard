import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

interface IRoomIds {
    userId: string | undefined,
    socketId: string,
    roomId: string 
}
// interface IDrawData {
//     userId: string,
//     boardId: string,
//     data: 
// }

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}