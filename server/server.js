import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",   // allow all (safe for demo)
    methods: ["GET", "POST"]
  }
});


io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("userMessage", (msg) => {
    console.log("User:", msg);

    let botReply = "I didn't understand 🤔";

    if (msg.toLowerCase().includes("hi")) botReply = "Hello 👋";
    else if (msg.toLowerCase().includes("bye")) botReply = "Goodbye 👋";
    else if (msg.toLowerCase().includes("help")) botReply = "How can I help you? 😊";

    socket.emit("botMessage", botReply);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});

