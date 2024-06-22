import 'reflect-metadata';
import express, {Request, Response} from 'express';
import { nanoid } from 'nanoid';
const app = express();
import http from 'http';
import {Server, Socket} from 'socket.io';
import bodyParser from 'body-parser';

import cors from 'cors';
import connectDB from './database/database';
import dotenv from 'dotenv';  
import authRoutes from './auth/auth'
import{ UserModel,RoomModel, IRoom } from './database/models';
const httpServer = http.createServer(app);

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["POST", "GET"],
  credentials: true,
};

app.use(bodyParser.json());  // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use('/', authRoutes);
dotenv.config();
connectDB()


const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
  });

  

  io.on('connection',async (socket: Socket) => {
    socket.on("room-joined",async (data: IRoom) => {
      const result = await UserModel.findOne({data: data.userId});
      if(result) {
        socket.join(result.boardId);
      }
       })
    

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('error', (err: Error) => {
        console.error('Socket error:', err);
    });

    socket.on("draw", async (data) => {
      const user = await UserModel.findOne({boardId: data.boardId})

      if(user) {
        socket.join(user.boardId);
        io.to(user.boardId).emit("draw", data.data);
      }
    })
});

httpServer.listen(process.env.PORT, () => {
    console.log("app is listening to localhost");
});
