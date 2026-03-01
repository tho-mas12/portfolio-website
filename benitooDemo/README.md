# Portfolio — Contact form setup 🔧

This project contains two simple pages (`index.html` and `contact.html`) and a Node.js backend that accepts contact submissions and sends them to an email address using SMTP (nodemailer).

## Quick setup

1. Install dependencies:

   npm install

2. Copy `.env.example` to `.env` and fill in SMTP credentials. Example for Gmail (recommended: use an App Password):

   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=your.email@gmail.com
   SMTP_PASS=your-app-password
   TO_EMAIL=thomasdarwin1208@gmail.com

3. Start server:

   npm start

4. Open http://localhost:3000/contact.html and submit the form. The email will be sent to the address configured in `TO_EMAIL` (default: `thomasdarwin1208@gmail.com`).

## Notes & troubleshooting

- For Gmail, set up an App Password (if your account uses 2FA) and use that as `SMTP_PASS`.
- If you see errors about authentication, double-check SMTP credentials and port/secure values.
- To test without sending real emails, use test accounts such as Mailtrap or Ethereal (nodemailer docs show how).

If you'd like, I can also implement a client-side fallback using a third-party form provider (Formspree / EmailJS) if you prefer not to run a server. ✅
