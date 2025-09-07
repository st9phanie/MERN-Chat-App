import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// CORS setup — restrict in production
app.use(cors({
  origin: process.env.CLIENT_URL || "*", // Replace "*" with frontend URL in production
  credentials: true,
}));

app.use(express.json({ limit: "4mb" }));

// HTTP routes
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter); 
app.use("/api/messages", messageRouter); 

// Database connection
await connectDB();

// Setup Socket.IO
export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST"],
  }
});

export const userSocketMap = {}; // { userId: socketId }

const getSocketId = (userId) => userSocketMap[userId];

io.on("connection", (socket) => {
  const userId = socket.handshake.auth.userId; // ✅ Prefer `auth` over `query`

  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log("User Connected:", userId);
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User Disconnected:", userId);
    
    // Only delete if socket matches (handle multi-tab)
    if (userSocketMap[userId] === socket.id) {
      delete userSocketMap[userId];
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server is running on PORT:", PORT));
