const jwt = require("jsonwebtoken");
const TokenModel = require("../model/token");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET;

async function checkBlacklist(req, res, next) {
  let token = req.token;

  let tokenList = await TokenModel.find();

  if (tokenList.length <= 0) {
    return next();
  }
  tokenList = tokenList[0].blacklisted;

  if (tokenList.includes(token)) {
    return res
      .status(401)
      .json({ message: "Unauthorized. Token is blacklisted." });
  }
  next();
}

function auth(req, res, next) {
  try {
    let token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ msg: "no token provided", status: 401 });
    }

    token = token.split(" ")[1];
    req.token = token;
    let isAuth = jwt.verify(token, SECRET_KEY);

    if (isAuth) {
      return next();
    }

    return res.status(401).json({ msg: "bad request", status: 401 });
  } catch (e) {
    console.log("something went wrong with token", e.message);
    return res.status(500).json({ msg: "Something went wrong", status: 500 });
  }
}

module.exports = { auth, checkBlacklist };
