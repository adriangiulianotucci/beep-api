async function connection(socket) {
  socket.logger.info("A user connected to socket");

  // const { roomId } = socket.handshake.query;
  // socket.join(roomId);

  socket.on("message", (message) => {
    console.log(message);
    socket.emit("message", "BIENVENIDO");
  });

  socket.on("disconnect", () => {
    socket.logger.info("A user disconnected");
  });
}

module.exports = connection;
