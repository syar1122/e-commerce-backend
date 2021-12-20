const {
  userValidation,
  loginValidation,
} = require("../validations/userValidate");
const User = require("../models/users.model");
const jwt = require("jsonwebtoken");

exports.createUser = (req, res) => {
  let { body } = req;
  if (body) {
    userValidation
      .validateAsync(body)
      .then((userData) => {
        let newUser = new User(userData);
        newUser
          .save()
          .then((newUser) => {
            res
              .status(200)
              .json({ message: "user created succesfuly", user: newUser });
          })
          .catch((err) => {
            res.status(500).json({
              message:
                "internal server error please try again later or try another email !!!",
            });
          });
      })
      .catch((err) => {
        res.status(400).json({
          message: err.message,
        });
      });
  }
};

exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.login = (req, res) => {
  const { body } = req;
  if (body) {
    loginValidation
      .validateAsync(body)
      .then((authData) => {
        console.log("authData", authData);
        if (authData) {
          User.findOne({ email: authData.email })
            .then((user) => {
              if (user) {
                console.log(user);
                if (user.password === authData.password) {
                  let sentUser = {
                    id: user._id,
                    email: user.email,
                    age: user.age,
                    username: user.username,
                    isAdmin: user.isAdmin,
                  };
                  let acces_token = jwt.sign(
                    sentUser,
                    process.env.JWT_ACCESS_SECRET
                  );
                  res.status(200).json({ user: sentUser, token: acces_token });
                } else {
                  res.status(400).json({ message: "wrong email or password" });
                }
              } else {
                res.status(400).json({ message: "wrong email or password" });
              }
            })
            .catch((err) => {
              res.status(500).json({ message: "internal server error" });
            });
        }
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  }
};
