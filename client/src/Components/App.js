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
    localStorage.getItem('user-token') && localStorage.getItem('username') ? true : false
  );
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [cart, setCart] = useState()

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      localStorage.removeItem('isLoggedIn');
    }
  }, [isLoggedIn]);

  const handleLogin = (userToken, usernameParam) => {
    setIsLoggedIn(true);
    setUsername(usernameParam);
    localStorage.setItem('user-token', userToken);
    localStorage.setItem("cart", JSON.stringify([]))
    localStorage.setItem('username', usernameParam);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.setItem('user-token', "");
    localStorage.removeItem('username');
    localStorage.removeItem("cart")
    localStorage.removeItem('isLoggedIn');
  };

  const handleSignUp = (userToken, usernameParam) => {
    setIsLoggedIn(true);
    setUsername(usernameParam);
    localStorage.setItem('user-token', userToken);
    localStorage.setItem("cart", JSON.stringify([]))
    localStorage.setItem('username', usernameParam);
  };

  return (
    <Router>
      <div className="app">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <Signup onSignup={handleSignUp} isLoggedIn={isLoggedIn} />
              )
            }
          />
          <Route
            path="/login-success"
            element={isLoggedIn ? <SuccessfulLogin /> : <Navigate to="/login" />}
          />
          <Route
            path="/user-account"
            element={
              isLoggedIn ? (
                <UserAccount isLoggedIn={isLoggedIn} onLogout={handleLogout} userToken={localStorage.getItem("user-token")} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;