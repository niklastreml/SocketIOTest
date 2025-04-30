const { io } = require("socket.io-client");

const socket = io("http://localhost:3333", {
  transports: ["websocket"],
  reconnection: false
});

socket.on("connect", () => {
  console.log(`[${new Date().toISOString()}] ✅ Connected to backend`);
  socket.send("I am here");

  // Halteverbindung durch periodische Nachricht
  setInterval(() => {
    socket.send("Still here");
  }, 15 * 60 * 1000); // alle 15 Minuten
});

socket.on("message", (msg) => {
  console.log(`[${new Date().toISOString()}] 📩 Message from server:`, msg);
});

socket.on("disconnect", () => {
  console.log(`[${new Date().toISOString()}] ❌ Disconnected from backend`);
});

socket.io.engine.on("ping", () => {
  console.log(`[${new Date().toISOString()}] --> Engine.IO Ping`);
});

socket.io.engine.on("pong", () => {
  console.log(`[${new Date().toISOString()}] <-- Engine.IO Pong`);
});


// Log Engine.IO Ping/Pong
socket.io.e
