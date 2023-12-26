const handlerError = (error, req, res, next) => {
  const func = error.func || "Not found func";
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";

  console.log(`${func}: ${message}`);

  res.status(status).send({
    status: status,
    message: message,
  });
  0;
};

module.exports = handlerError;
