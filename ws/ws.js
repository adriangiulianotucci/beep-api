const { Server } = require("socket.io");

function webSocket(expressServer) {
  const io = new Server(expressServer, {
    cors: {
      origin: process.env.WHITELIST || "*",
    },
  });

  io.on("connection", (socket) => {
    socket.on("join", function (room) {
      console.log(`Socket: ${socket.id} joined room: ${room}`);
      socket.join(room);
    });
  });
}

module.exports = webSocket;
