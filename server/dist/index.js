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
    origin: "https://collaborative-whiteboard-cngayikxa-brahmjagotas-projects.vercel.app",
    methods: ["POST", "GET"],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "https://collaborative-whiteboard-cngayikxa-brahmjagotas-projects.vercel.app",
        credentials: true,
    },
});
io.on('connection', (socket) => {
    socket.on('disconnect', () => {
    });
    socket.on("draw", (data) => {
        socket.broadcast.emit("draw", data);
    });
});
httpServer.listen(5000, () => {
    console.log("app is listening");
});
