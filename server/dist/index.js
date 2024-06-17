"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const httpServer = http_1.default.createServer(app);
const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
// console.log(io)
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});
io.on('connection', (socket) => {
    console.log('A user connected. Socket ID:', socket.id);
    socket.on('disconnect', () => {
        console.log('User disconnected. Socket ID:', socket.id);
    });
    socket.on('error', (err) => {
        console.error('Socket error:', err);
    });
    socket.on("hello", (data) => console.log("data", data));
    socket.on("draw", (data) => {
        socket.broadcast.emit("draw", data);
    });
});
app.get("/", (req, res, Response) => {
    res.send("Hello from me");
});
httpServer.listen(5000, () => {
    console.log("app is listening to localhost:5000");
});
