import "dotenv/config";
import { Router } from "express";
import AuthService from "../service/AuthService.js";
import { createToken } from "../JWT/JsWebToken.js";
import { transporter } from "../Verify-account/nodemailer.js";

const AuthControllers = Router();

AuthControllers.post("/register", async (req, res) => {
  try {
    const { fullname, email, country, password } = req.body;

    if (!fullname || !email || !country || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await AuthService.findUserByEmail?.(email);
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await AuthService.registedUser({
      fullname,
      email,
      country,
      password,
    });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Verify your account",
        text: "Your verification code is 483921",
      });
    } catch (err) {
      console.error("Registration verification email failed:", err);
      return res.status(502).json({
        message: "Account created, but verification email could not be sent",
      });
    }

    const jwt = await createToken(user);
    res.cookie("auth", jwt, { httpOnly: true });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        country: user.country,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Registration failed" });
  }
});

AuthControllers.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await AuthService.login({ email, password });
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Verify your account",
        text: "Your verification code is 483921",
      });
    } catch (err) {
      console.error("Login verification email failed:", err);
      return res.status(502).json({
        message: "Login succeeded, but verification email could not be sent",
      });
    }

    const jwt = await createToken(user);
    res.cookie("auth", jwt, { httpOnly: true });

    return res.json({
      message: "Login successful",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        country: user.country,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(401).json({ message: "Invalid email or password" });
  }
});

AuthControllers.post("/logout", (_req, res) => {
  res.clearCookie("auth");
  return res.sendStatus(204);
});

export default AuthControllers;
