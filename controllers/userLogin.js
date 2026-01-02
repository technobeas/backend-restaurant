const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
     console.log("HEADERS:", req.headers);
    console.log("BODY:", req.body);

    // Check email
    let user = await User.findOne({ email });

    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // res
    //   .cookie("token", token, {
    //     httpOnly: true,
    //     // secure: process.env.NODE_ENV === "production",
    //     sameSite: "lax",
    //     maxAge: 24 * 60 * 60 * 1000, // 1 day
    //   })
    //   .status(201)
    //   .json({
    //     success: true,
    //     message: "Login successful",
    //     user,
    //   });

    // below working on pc but not on mobile
  //   res
  // .cookie("token", token, {
  //   httpOnly: true,
  //   secure: true,        // REQUIRED on HTTPS (Render)
  //   sameSite: "none",    // REQUIRED for cross-site cookies
  //   maxAge: 24 * 60 * 60 * 1000,
  // })
  // .status(200)
  // .json({
  //   success: true,
  //   message: "Login successful",
  //   user,
  // });

    // new testing
    res
  .cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // only required on prod HTTPS
    sameSite: "none", // lowercase is critical
    maxAge: 24 * 60 * 60 * 1000,
  })
  .status(200)
  .json({
    success: true,
    message: "Login successful",
    user,
  });

 
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = (req, res) => {
  try {
    // res.cookie("token", "").json({
    //   message: "Logut Succesfull..",
    //   success: true,
    // });
    res.cookie("token", "", {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  expires: new Date(0),
}).json({
  success: true,
  message: "Logout successful",
});
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
