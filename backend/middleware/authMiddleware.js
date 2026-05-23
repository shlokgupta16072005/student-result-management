const jwt = require(
  "jsonwebtoken"
);

const authMiddleware = (
  req,
  res,
  next
) => {

  try {

    const authHeader =
      req.headers.authorization;

    // CHECK TOKEN

    if (!authHeader) {

      return res.status(401).json({
        success: false,
        message:
          "No token provided",
      });
    }

    // GET TOKEN

    const token =
      authHeader.split(" ")[1];

    // VERIFY TOKEN

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    // SAVE ADMIN DATA

    req.admin = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message:
        "Invalid token",
    });
  }
};

module.exports =
  authMiddleware;