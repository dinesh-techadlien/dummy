import React, { useState } from 'react';

const Verification = () => {
  const [phonenumber, setPhoneNumber] = useState('');
  const [VerificationCode, setVerificationCode] = useState('');

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your backend API endpoint for signin with OTP verification
      const response = await fetch('http://localhost:5000/verify-otp-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phonenumber: phonenumber, verificationCode: VerificationCode }),
      });
      const data = await response.json();
      console.log(data.message);
      // Handle success or error messages from the backend
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Signup with OTP Verification</h2>
      <form onSubmit={handleSignin}>
        <input
          type="text"
          placeholder="Phone Number"
          value={phonenumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="OTP"
          value={VerificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          required
        />
        <button type="submit">Signin</button>
      </form>
    </div>
  );
};

export default Verification;
 