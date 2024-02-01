import React, { useEffect, useState } from 'react';
import { useAuth } from '../Firebase/AuthContext';
import { getAuth, applyActionCode } from 'firebase/auth';

const VerifyEmail = ({ actionCode }) => {
  const auth = getAuth();
  const { currentUser } = useAuth();
  const [verificationMessage, setVerificationMessage] = useState('');

  useEffect(() => {
    // Verify the email action code when the component mounts
    const verifyEmail = async () => {
      try {
        await applyActionCode(auth, actionCode);
        setVerificationMessage('Email verified successfully!');
      } catch (error) {
        setVerificationMessage('Error verifying email. Please try again.');
        console.error('Error verifying email:', error.message);
      }
    };

    // Check if the user is signed in before attempting to verify the email
    if (currentUser) {
      verifyEmail();
    } else {
      setVerificationMessage('User not signed in. Please sign in and try again.');
    }
  }, [auth, actionCode, currentUser]);

  return (
    <div>
      <h2>Email Verification</h2>
      <p>{verificationMessage}</p>
    </div>
  );
};

export default VerifyEmail;