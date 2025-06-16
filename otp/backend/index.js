const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const twilio = require('twilio');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const otpStore = new Map(); // In-memory store: { phone => { otp, expiresAt } }

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

app.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  const otp = generateOTP();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes expiry

  otpStore.set(phone, { otp, expiresAt });

  try {
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });
    res.json({ success: true, message: 'OTP sent' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to send OTP', error: err.message });
  }
});

app.post('/verify-otp', (req, res) => {
  const { phone, otp } = req.body;
  const record = otpStore.get(phone);

  if (!record) return res.status(400).json({ success: false, message: 'No OTP sent to this number' });

  if (Date.now() > record.expiresAt) return res.status(400).json({ success: false, message: 'OTP expired' });

  if (record.otp !== otp) return res.status(400).json({ success: false, message: 'Invalid OTP' });

  otpStore.delete(phone);
  res.json({ success: true, message: 'OTP verified' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
