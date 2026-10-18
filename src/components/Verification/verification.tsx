import "./verify.css";
import { Link } from "react-router-dom";
import "dotenv/config";
import nodemailer from "nodemailer";





const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });







  
  return (
    <main className="verify-page">
      <Link to="/" className="back-main">
        ← Back to main page
      </Link>

      <section className="verify-card">
        <div className="verify-icon">
          ✉<span>✓</span>
        </div>

        <h1>
          Verify your <span>account</span>
        </h1>

        <p className="description">We sent a 6-digit verification code to</p>

        <p className="email">m********@gmail.com</p>

        <form className="verify-form" action="#" method="POST">
          <div className="code-inputs">
            <input
              type="text"
              maxLength={1}
              inputMode="numeric"
              autoComplete="one-time-code"
              autoFocus
              required
            />

            <input type="text" maxLength={1} inputMode="numeric" required />

            <input type="text" maxLength={1} inputMode="numeric" required />

            <input type="text" maxLength={1} inputMode="numeric" required />

            <input type="text" maxLength={1} inputMode="numeric" required />

            <input type="text" maxLength={1} inputMode="numeric" required />
          </div>

          <div className="expiration">
            <span className="clock">◷</span>

            <span>Code expires in</span>

            <strong>09:56</strong>
          </div>

          <div className="resend">
            <p>Didn't receive the code?</p>

            <button type="button">↻ Resend code</button>
          </div>

          <button type="submit" className="verify-button">
            Verify account
            <span>→</span>
          </button>

          <div className="security-message">
            <span>♢</span>

            <p>Your account is safe with us</p>
          </div>
        </form>
      </section>
    </main>
  );
}
