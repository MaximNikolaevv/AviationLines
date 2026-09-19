import jwt from "jsonwebtoken";
import User from "../models/models.js";

const SECRET = process.env.JWT_SECRET || "superSecret";

export async function createToken(UserData) {
  const user = await User.findOne({ email: UserData.email });

  if (!user) {
    throw new Error("User not found for token generation");
  }

  const payload = {
    _id: user._id,
    email: user.email,
  };

  return jwt.sign(payload, SECRET, { expiresIn: "2d" });
}


