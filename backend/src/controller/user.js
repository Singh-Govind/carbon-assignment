const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/user");
const TokenModel = require("../model/token");
require("dotenv").config();

const saltRounds = process.env.SALT;
const SECRET_KEY = process.env.SECRET;

const User = {};

User.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "user not found", status: 404 });
    }

    let comparedPassword = await bcrypt.compare(password, user.password);

    if (!comparedPassword) {
      return res.status(400).json({ msg: "incorrect password!", status: 400 });
    }

    user = {
      _id: user._id.toHexString(),
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(user, SECRET_KEY, { expiresIn: "7d" });

    res.json({ user, token, status: 200 });
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, msg: "something went wrong", err: e.message });
  }
};

User.register = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    let user = await UserModel.findOne({ email });

    if (user) {
      return res
        .status(409)
        .json({ msg: "already registered, please login!", status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    user = await UserModel.create({ name, email, password: hashedPassword });

    res.json({ status: 201, msg: "created" });
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, msg: "something went wrong", err: e.message });
  }
};

User.logout = async (req, res) => {
  try {
    let token = req.token;

    if (token) {
      let tokenList = await TokenModel.find();
      if (tokenList.length <= 0) {
        await TokenModel.create({ blacklisted: [token] });
        return res.json({ message: "Token invalidated successfully." });
      }
      let id = tokenList[0]._id;
      tokenList = tokenList[0].blacklisted;
      let newTokenList = [...tokenList, token];
      await TokenModel.findOneAndUpdate(
        { _id: id },
        { blacklisted: newTokenList }
      );

      return res.json({ message: "Token invalidated successfully." });
    } else {
      return res.status(400).json({ message: "No token provided." });
    }
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, msg: "something went wrong", err: e.message });
  }
};

module.exports = User;
