import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import ProductPage from './ProductPage';
import Login from './Login';
import Signup from './Signup';
import SuccessfulLogin from './SuccessfulLogin';
import UserAccount from './UserAccount';
import Cart from './Cart';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('userId') || localStorage.getItem('username') ? true : false
  );
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      localStorage.removeItem('isLoggedIn');
    }
  }, [isLoggedIn]);

  const handleLogin = (userIdParam, usernameParam) => {
    setIsLoggedIn(true);
    setUserId(userIdParam);
    setUsername(usernameParam);
    localStorage.setItem('userId', userIdParam);
    localStorage.setItem('username', usernameParam);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setUsername('');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
  };

  const handleSignUp = (userIdParam, usernameParam) => {
    setIsLoggedIn(true);
    setUserId(userIdParam);
    setUsername(usernameParam);
    localStorage.setItem('userId', userIdParam);
    localStorage.setItem('username', usernameParam);
  };

  return (
    <Router>
      <div className="app">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Signup onSignup={handleSignUp} isLoggedIn={isLoggedIn} />} />
          <Route path="/login-success" element={isLoggedIn ? <SuccessfulLogin /> : <Navigate to="/login" />} />
          <Route path="/user-account" element={isLoggedIn ? <UserAccount isLoggedIn={isLoggedIn} onLogout={handleLogout} userId={userId} /> : <Navigate to="/login" />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
