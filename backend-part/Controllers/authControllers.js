import { Router } from "express";
import AuthService from "../service/AuthService.js";
import { createToken } from '../JWT/JsWebToken.js';

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

    const jwt = await createToken(user);
    res.cookie("auth", jwt, { httpOnly: true });
    console.log("Register auth cookie:", jwt);

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
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await AuthService.login({ email, password });
    const jwt = await createToken(user);
    res.cookie("auth", jwt, { httpOnly: true,});
    console.log("Login auth cookie:", jwt);

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

export default AuthControllers;