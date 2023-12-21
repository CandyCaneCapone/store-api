const User = require("../models/user");
const BadRequestError = require("../errors/bad-request-error");
const UnAuthenticatedError = require("../errors/unauthenticated-error");
const jwt = require("jsonwebtoken")

const signup = async (req, res, next) => {
  try {
    await User.create(req.body);
    res.status(201).json({ message: "user created" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Please provide email and password");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new UnAuthenticatedError("please provide a valid email or password");
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      throw new UnAuthenticatedError("please provide a valid email or password");
    }

    const token = await jwt.sign(
      { _id: user._id, username: user.username },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );
    res.json({ message: "login was successful", token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
};
