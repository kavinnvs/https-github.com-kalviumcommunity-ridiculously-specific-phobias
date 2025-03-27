const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decoded = jwt.verify(token, process.env.private_key);
  req.user = decoded;

  next();
});