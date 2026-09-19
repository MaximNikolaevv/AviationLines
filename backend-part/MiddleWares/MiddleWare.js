import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "superSecret";

export default function authMiddlewares(req, res, next) {
  const token = req.cookies["auth"];

  if (!token) {
    return next();
  }

  try {
    jwt.verify(token, SECRET);
    next();
  } catch (error) {
    console.log(error.message);
    next();
  }
}