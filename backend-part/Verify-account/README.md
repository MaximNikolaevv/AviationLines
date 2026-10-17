# Nodemailer

1. Create a Gmail App Password for the account that will send emails.
2. Copy `.env.example` to `.env` in the project root and add the Gmail address and App Password.
3. Send a test email:

   ```sh
   npm run email:test -- recipient@example.com
   ```

Use `sendEmail({ to, subject, text })` from `nodemailer.js` to send an email from backend code.
