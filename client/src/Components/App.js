import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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
    localStorage.getItem('userId') && localStorage.getItem('username') ? true : false
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
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <Home {...props} isLoggedIn={isLoggedIn} onLogin={handleLogin} />
            )}
          />
          <Route path="/products" component={ProductPage} />
          <Route
            path="/login"
            render={(props) =>
              isLoggedIn ? (
                <Redirect to="/" />
              ) : (
                <Login {...props} onLogin={handleLogin} isLoggedIn={isLoggedIn} />
              )
            }
          />
          <Route
            path="/signup"
            render={(props) =>
              isLoggedIn ? (
                <Redirect to="/" />
              ) : (
                <Signup {...props} onSignup={handleSignUp} isLoggedIn={isLoggedIn} />
              )
            }
          />
          <Route
            path="/login-success"
            render={() =>
              isLoggedIn ? <SuccessfulLogin /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/user-account"
            render={(props) =>
              isLoggedIn ? (
                <UserAccount
                  {...props}
                  isLoggedIn={isLoggedIn}
                  onLogout={handleLogout}
                  userId={userId}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route path="/cart" component={Cart} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
