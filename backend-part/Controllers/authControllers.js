import "dotenv/config";
import { randomInt } from "node:crypto"; // Генерира непредвидими шестцифрени кодове.
import { Router } from "express";
import AuthService from "../service/AuthService.js";
import { createToken } from "../JWT/JsWebToken.js";
import { transporter } from "../Verify-account/nodemailer.js";
import { saveVerificationCode, verifyCode,} from "../Verify-account/verificationCodes.js"; // Използва общото съхранение на кодове в backend-а.

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
    const verificationCode = randomInt(100000, 1000000).toString(); // Генерира шестцифрен код.

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Потвърдете профила си",
        text: `Кодът ви за потвърждение е ${verificationCode}`, // Изпраща генерирания код само по имейл.
      });
      saveVerificationCode(user.email, verificationCode); // Запазва кода само след успешно изпращане на имейла.
    } catch (err) {
      console.error("Registration verification email failed:", err);
      return res.status(502).json({
        message:
          "Профилът е създаден, но имейлът за потвърждение не можа да бъде изпратен",
      });
    }

    return res.status(201).json({
      // Указва на клиента да отвори формата за потвърждение.
      message: "Кодът за потвърждение е изпратен",
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
    const verificationCode = randomInt(100000, 1000000).toString(); // Генерира нов код при влизане.

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Потвърдете профила си",
        text: `Кодът ви за потвърждение е ${verificationCode}`, // Изпраща генерирания код само по имейл.
      });
      saveVerificationCode(user.email, verificationCode); // Заменя предишния чакащ код.
    } catch (err) {
      console.error("Login verification email failed:", err);
      return res.status(502).json({
        message:
          "Влизането бе успешно, но имейлът с кода за потвърждение не можа да бъде изпратен",
      });
    }

    return res.json({ message: "Кодът за потвърждение е изпратен" }); // Влизането приключва след потвърждение на кода.
  } catch (err) {
    console.error("Login error:", err);
    return res.status(401).json({ message: "Invalid email or password" });
  }
});

AuthControllers.post("/verify", async (req, res) => {
  try {
    const { email, code } = req.body;

    if (
      typeof email !== "string" ||
      typeof code !== "string" ||
      !/^\d{6}$/.test(code)
    ) {
      return res
        .status(400)
        .json({ message: "Необходим е имейл и шестцифрен код" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await AuthService.findUserByEmail(normalizedEmail);
    if (!user || !verifyCode(user.email, code)) {
      // Сравнява въведения код със запазения на сървъра.
      return res
        .status(400)
        .json({ message: "Кодът за потвърждение е невалиден или изтекъл" }); // Не разкрива коя стойност е грешна.
    }

    const jwt = await createToken(user);
    res.cookie("auth", jwt, { httpOnly: true });
    return res.json({ message: "Профилът е потвърден успешно" });
  } catch (err) {
    console.error("Грешка при потвърждение:", err);
    return res.status(500).json({ message: "Потвърждението не бе успешно" });
  }
});

AuthControllers.post("/resend-code", async (req, res) => {
  // Изпраща нов код по заявка на потребителя.
  try {
    const { email } = req.body;

    if (typeof email !== "string" || !email.trim()) {
      return res.status(400).json({ message: "Необходим е имейл адрес" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await AuthService.findUserByEmail(normalizedEmail);
    if (!user) {
      return res.status(404).json({ message: "Профилът не е намерен" });
    }

    const verificationCode = randomInt(100000, 1000000).toString();
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Нов код за потвърждение",
      text: `Кодът ви за потвърждение е ${verificationCode}`, // Включва новия код в имейла.
    }); // Край на изпращането на писмото.
    saveVerificationCode(user.email, verificationCode); // Заменя стария код и подновява срока и брояча на опитите.

    return res.json({ message: "Изпратихме нов код за потвърждение" });
  } catch (err) {
    console.error("Неуспешно повторно изпращане на кода:", err);
    return res
      .status(502)
      .json({ message: "Новият код за потвърждение не можа да бъде изпратен" });
  }
});

AuthControllers.post("/logout", (_req, res) => {
  res.clearCookie("auth");
  return res.sendStatus(204);
});

export default AuthControllers;
