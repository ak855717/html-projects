import React, { useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000'; // Change if deployed

function App() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');

  const sendOtp = async () => {
    try {
      const res = await axios.post(`${API}/send-otp`, { phone });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error sending OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post(`${API}/verify-otp`, { phone, otp });
      setMessage(res.data.message);
      setStep(3);
    } catch (err) {
      setMessage(err.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>OTP Verification</h2>
      {step === 1 && (
        <>
          <input type="tel" placeholder="Enter phone number" value={phone} onChange={e => setPhone(e.target.value)} />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}
      {step === 2 && (
        <>
          <input type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
      {step === 3 && <h3>Phone verified successfully!</h3>}
      <p>{message}</p>
    </div>
  );
}

export default App;
