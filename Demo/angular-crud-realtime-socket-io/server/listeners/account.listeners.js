const account = (io, socket) => {
  socket.on("account:create", (account) => {
    socket.broadcast.emit("account:create", account);
  });

  socket.on("account:update", (account) => {
    socket.broadcast.emit("account:update", account);
  });

  socket.on("account:delete", (id) => {
    socket.broadcast.emit("account:delete", id);
  });
};

module.exports = account;
