import { config } from "dotenv";
import nodemailer from "nodemailer";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const envPath = resolve(dirname(fileURLToPath(import.meta.url)), "../.env");
config({ path: envPath });

const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});


// dirname() → намира директорията на даден файл
// resolve() → изгражда абсолютен path