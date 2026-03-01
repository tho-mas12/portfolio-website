require("dotenv").config();

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

console.log("DB_HOST =", process.env.DB_HOST);
console.log("DB_USER =", process.env.DB_USER);
console.log("DB_PASSWORD exists =", !!process.env.DB_PASSWORD);
console.log("DB_NAME =", process.env.DB_NAME);

console.log("🔥 THIS IS THE UPDATED SERVER FILE 🔥");

const express = require("express");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = 3002;

/* =========================
   Middleware
========================= */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

/* =========================
   MySQL Connection
========================= */


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

console.log("USING DB USER:", process.env.DB_USER);

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
  } else {
    console.log("✅ MySQL connected successfully");
  }
});

/* =========================
   Ethereal Email Setup
========================= */
let transporter;

(async () => {
  const testAccount = await nodemailer.createTestAccount();

  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  console.log("✅ Ethereal Email ready");
})();

/* =========================
   Contact Form Route
========================= */
app.post("/contact", async (req, res) => {
  const { name, email, mobile, message } = req.body;

  // 1️⃣ Save message in database
  const sql =
    "INSERT INTO contact_messages (name, email, mobile, message) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, mobile, message], async (err) => {
    if (err) {
      console.error("❌ Database insert failed:", err);
      return res.status(500).send("Database error");
    }

    console.log("✅ Message stored in database");

    // 2️⃣ Send email (Ethereal)
    const mailOptions = {
      from: `"Portfolio Contact" <portfolio@ethereal.email>`,
      to: "admin@ethereal.email",
      subject: "📩 New Portfolio Contact Message",
      html: `
        <h3>New Message Received</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mobile:</b> ${mobile}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("✅ Email sent");
      console.log("📬 Preview URL:", nodemailer.getTestMessageUrl(info));

      res.send(`
        <h2>Message Sent Successfully ✅</h2>
        <p>Thank you, ${name}. I will contact you soon.</p>
        <a href="/contact.html">Go Back</a>
      `);
    } catch (error) {
      console.error("❌ Email sending failed:", error);
      res.status(500).send("Email sending failed");
    }
  });
});

/* =========================
   Start Server
========================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
