const httpStatus = require("http-status-codes");

exports.logErrors = (error, req, res, next) => {
  console.error(error.stack);
  next(error);
};
