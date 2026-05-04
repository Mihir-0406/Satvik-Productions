require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Contact = require('./models/Contact');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));


// =======================
// CONTACT ROUTES
// =======================

const nodemailer = require('nodemailer');

// Submit Contact Form
app.post('/api/contact', async (req, res) => {
  try {
    const { 'full-name': name, email, 'project-type': subject, message } = req.body;
    
    // Save to database
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    // Setup Nodemailer to send email via Gmail
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'satvikproductions2024@gmail.com',
        pass: process.env.EMAIL_PASS
      }
    });

    let mailOptions = {
      from: process.env.EMAIL_USER || 'satvikproductions2024@gmail.com',
      to: 'satvikproductions2024@gmail.com',
      subject: `New Inquiry: ${subject} from ${name}`,
      text: `You have received a new contact message.\n\nName: ${name}\nEmail: ${email}\nProject Type: ${subject}\n\nMessage:\n${message}`
    };

    // Send email and log error if authentication fails (wrong password)
    transporter.sendMail(mailOptions).catch(err => console.error('Email error:', err.message));

    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
