const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";

  if (err.name == "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }

  if (err.name == "CastError") {
    statusCode = 404;
    message = `No item found with id : ${err.value}`;
  }

  res.status(statusCode).json({ status: statusCode, message: message });
};
module.exports = errorHandler;
