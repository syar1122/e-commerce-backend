const jwt = require("jsonwebtoken");

let verifyToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    res.status(401).json({ message: "not authenticated" });
  } else {
    let token = req.headers["authorization"].split(" ")[1];
    console.log(token);
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        res.status(401).json({ message: "not authenticated" });
      } else {
        req.user = user;
        next();
      }
    });
  }
};

let isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Access Denied" });
  }
};

module.exports = { verifyToken, isAdmin };
