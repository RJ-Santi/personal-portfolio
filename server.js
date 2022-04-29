const express = require('express');
const http = require('http');
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(__dirname + 'public/index');
});

app.post('/', (req, res) => {
  console.log(req.body);

  // if using gmail
  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 587,
    service: 'yahoo',
    secure: false,
    auth: {
      user: 'process.env.EMAIL',
      pass: 'process.env.PASSWORD'
    },
    debug: false,
    logger: true
  }
  );

  const info = {
    from: req.body.email,
    to: 'rsjames13@yahoo.com',
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message
  }

  const sendMail = transporter.sendMail(info, (err, data) => {
    if(err) {
      console.log(err);
      res.send('Error');
    } else {
      console.log('Email sent: ' + data.response);
      res.send('Success');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}.`);
});
