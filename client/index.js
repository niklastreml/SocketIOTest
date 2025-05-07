const { io } = require("socket.io-client");

// require("dotenv").config();


function NewClient(id) {
    const socket = io(process.env.BACKEND_URL, {
        transports: ["websocket"],
        reconnection: false
    });
    let interval;

    socket.on("connect", () => {
        console.log(`[${new Date().toISOString()}] [${id}] ✅ Connected to backend`);
        socket.send(`I am here ID: ${id}`);

        // Halteverbindung durch periodische Nachricht
        interval = setInterval(() => {
            socket.send(`Still here ID: ${id}`);
        }, 15 * 60 * 1000); // alle 15 Minuten
    });

    socket.on("message", (msg) => {
        console.log(`[${new Date().toISOString()}] [${id}] 📩 Message from server:`, msg);
    });

    socket.on("disconnect", (msg) => {
        console.log(`[${new Date().toISOString()}] [${id}] ❌ Disconnected from backend Reason: ${msg}`);
        clearInterval(interval);
    });

    socket.io.engine.on("ping", () => {
        console.log(`[${new Date().toISOString()}] [${id}] --> Engine.IO Ping`);
    });

    socket.io.engine.on("pong", () => {
        console.log(`[${new Date().toISOString()}] [${id}] <-- Engine.IO Pong`);
    });
}


const nClients = 50;

for (let i = 0; i < nClients; i++) {
    console.log(`Setting up client ${i}`)
    NewClient(i);
}
