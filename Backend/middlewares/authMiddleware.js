const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const cookieToken = req.cookies?.token;
    const authHeader = req.headers?.authorization || "";
    const bearerToken = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;
    const token = cookieToken || bearerToken;

    if (!token) {
      return res
        .status(401)
        .send({ message: "No authentication token provided", success: false });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
      if (err) {
        return res
          .status(401)
          .send({ message: "Token is not valid", success: false });
      } else {
        req.body = req.body || {};
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    console.error(error); 
    res.status(500).send({ message: "Internal server error", success: false });
  }
};

module.exports = {
  authMiddleware
}