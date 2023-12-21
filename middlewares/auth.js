const jwt = require("jsonwebtoken");
const UnAuthenticatedError = require("../errors/unauthenticated-error");

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("please provide token");
  }

  const token = authHeader.split(" ")[1]
  try {
      const user = jwt.verify(token , process.env.SECRET_KEY)
      req.user = user ; 

  }catch(error) {
    next(new UnAuthenticatedError("Please provide a valid token"))
  }

  next()
};

module.exports = isAuthenticated;