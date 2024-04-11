import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessfulLogin = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/baby'); // Redirect to the baby page upon successful login
  };

  return (
    <div className="successful-login-container">
      <h2>Login Successful!</h2>
      <p>Explore our Baby Products and Shop Now!</p>
      <button onClick={handleRedirect}>Shop Baby Products</button>
    </div>
  );
};

export default SuccessfulLogin;
