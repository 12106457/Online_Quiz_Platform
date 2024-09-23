const jsonwebtoken = require("jsonwebtoken");

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided." });
  }

  // if (token.startsWith("Bearer ")) {
  //   token = token.slice(7, token.length);
  // }

  jsonwebtoken.verify(token, "saikey", (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ message: "Unauthorized! Please login ..." });
    }
    // console.log(decoded);
    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
