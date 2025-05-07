const { Server } = require("socket.io");

const PORT = 3333;

const io = new Server(PORT, {
  cors: {
    origin: "*"
  }
});

function log(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

log(`📡 WebSocket-Server läuft und wartet auf Verbindungen auf Port ${PORT}...`);

io.on("connection", (socket) => {
  const clientAddr = socket.handshake.address || 'Unbekannt';
  log(`🔌 Neue Verbindung von Client (${clientAddr})`);

  socket.on("disconnect", (msg) => {
    log(`❌ Verbindung zu Client getrennt: ${msg}`);
  });

  socket.on("message", (msg) => {
    log(`📩 Nachricht vom Client: ${msg}`);
    socket.send("Nachricht empfangen");
  });
  socket.on("error", (error) => {
    log(`❗ Fehler: ${error}`);
  });

  socket.on("ping", () => {
    log("📥 Server hat ping erhalten");
  });
  socket.on("pong", () => {
    log("📤 Server sendet: pong");
  });

  socket.on("connect_error", (error) => {
    log(`❗ Verbindungsfehler: ${error}`);
  });
  socket.on("connect_timeout", (timeout) => {
    log(`❗ Verbindungszeitüberschreitung: ${timeout}`);
  });
  socket.on("reconnect_attempt", (attempt) => {
    log(`🔄 Wiederverbindungsversuch: ${attempt}`);
  });
  socket.on("reconnect", (attempt) => {
    log(`🔄 Wiederverbunden: ${attempt}`);
  });
});

