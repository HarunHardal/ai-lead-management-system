const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  try {

    const token = req.cookies.token;

    console.log("COOKIES:", req.cookies)

    if (!token) {
      return res.status(401).json({
        message: "Giriş yapmalısın"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Token geçersiz"
    });

  }

};