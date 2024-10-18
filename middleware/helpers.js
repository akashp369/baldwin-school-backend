const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {
        userId: userId,
      };
      const secret = process.env.JWT_SECRET_USER;
      JWT.sign(payload, secret, (err, token) => {
        if (err) {
          reject(createError.InternalServerError());
          return;
        }
        resolve(token);
      });
    });
  },

  verifyAccessToken: (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded = JWT.verify(token, process.env.JWT_SECRET_USER);
        console.log(decoded);
        req.userId = decoded.userId;
        next();
      } catch (error) {
        return res.status(401).json({ message: "User not authorized" });
      }
    } else {
      return res
        .status(401)
        .json({ message: "Authorization token is missing" });
    }
  },
};
