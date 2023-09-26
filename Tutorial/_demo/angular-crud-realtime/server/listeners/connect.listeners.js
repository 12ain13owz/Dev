const connect = (io, socket) => {
  console.log("user connected");
  socket.on("disconnect", () => console.log("user disconnected"));

  const count = io.engine.clientsCount;
  console.log("Clients count: " + count);
};

module.exports = connect;
