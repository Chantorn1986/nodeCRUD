const jwt = require("jsonwebtoken");
exports.auth = (req, res, next) => {
  try {
    //code
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({
        message: "No token, authorization denied!!",
      });
    }
    const verifyToken = jwt.verify(token, "appPAC", (err, decode) => {
      if (err) {
        return res.status(401).json({ message: "Token is not invalid" });
      } else {
        console.log(decode);
        req.user = decode;
        // console.log("token", verifyToken);
        next();
      }
    });
  } catch (err) {
    // err
    console.log("Something wrong in middleware");
    res.status(500).json({ message: "Server Error!!" });
  }
};

exports.isAuthenticated = async (req, res, next) => {
  try {
    if (req.session.user) {
      return next();
    } else {
      res.redirect('/logIO');
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Is Authenticated Invalid' })
  }

}

exports.ifLoggedIn = async (req, res, next) => {
  try {
    if (req.session.user) {
      return res.redirect('/pac/home');
    }
    next();
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'If Logged In Invalid' })
  }
}