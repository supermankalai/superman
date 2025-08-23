const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Configure nodemailer with Gmail
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your Gmail address
    pass: 'your-app-password' // Replace with your Gmail app password
  }
});

app.post('/send-email', (req, res) => {
  const { name, feedback } = req.body;

  const mailOptions = {
    from: 'your-email@gmail.com', // Replace with your Gmail address
    to: 'your-email@gmail.com', // Replace with your Gmail address
    subject: 'Birthday Wish from ' + name,
    text: feedback
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
