let User = require("../models/user");
let config = require("../../config/config");
let jwt = require("jsonwebtoken");
let { expressjwt } = require("express-jwt");

module.exports.signin = async function (req, res, next) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("User not found");
    if (!user.authenticate(req.body.password))
      throw new Error("Email and/or password don't match.");

    // Update lastLogin before issuing the token
    user.lastLogin = new Date(); // Set the lastLogin field to the current date and time
    await user.save(); // Save the updated user data


    // Issue the token
    let payload = {
      id: user._id,
      userId:user.userId,
      username: user.username,
    };

    let token = jwt.sign(payload, config.SECRETKEY, {
      algorithm: "HS512",
      expiresIn: "1d",
    });

    // Send the token to the client
    return res.json({
      success: true,
      token: token,
      user: payload,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Checks the token validation
module.exports.requireSignin = expressjwt({
  secret: config.SECRETKEY,
  algorithms: ["HS512"],
  userProperty: "auth",
});

// Checks if the requester is allowed to perform the acction.
module.exports.hasAuthorization = async function (req, res, next) {
  let authorized =
    req.auth && req.user && req.user.username == req.auth.username;

  if (!authorized) {
    return res.status("403").json({
      success: false,
      message: "User is not authorized",
    });
  }
  next();
};
