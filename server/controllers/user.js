const User = require("../models/user");

exports.read = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not Found"
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};

exports.update = (req, res) => {
  const { name, password } = req.body;

  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not Found"
      });
    }
    if (!name) {
      return res.status(400).json({
        error: "Please enter a Name"
      });
    } else {
      user.name = name;
    }
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          error: "Password must be at least 6 characters"
        });
      } else {
        user.password = password;
      }
    }

    user.save((err, updateUser) => {
      if (err) {
        return res.status(400).json({
          error: "Update failed"
        });
      }
      updateUser.hashed_password = undefined;
      updateUser.salt = undefined;
      res.json(updateUser);
    });
  });
};
