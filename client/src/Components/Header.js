import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import CSS for header styling

const Header = ({ isLoggedIn, onLogout }) => {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // Simulate fetching cart item count (replace with actual API call)
    // This useEffect runs once when component mounts
    const fetchCartItemCount = async () => {
      try {
        // Replace with actual API call to fetch cart item count
        const response = await fetch('/api/cart/items/count');
        if (response.ok) {
          const data = await response.json();
          setCartItemCount(data.count); // Update cart item count state
        }
      } catch (error) {
        console.error('Error fetching cart item count:', error);
      }
    };

    fetchCartItemCount(); // Call the fetch function
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">BabyShop</Link>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            {isLoggedIn ? (
              <Link to="/user-account">Add Product</Link>
            ) : (
              ""
            )}
          </li>
          <li>
            {isLoggedIn ? (
              <button onClick={onLogout}>Logout</button>
            ) : (
              <Link to="/signup">Signup</Link>
            )}
          </li>
          <li>
            {isLoggedIn ? (
              <button onClick={onLogout}>Signup</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
      <div className="cart">
        <Link to="/cart">
          <span>Cart ({cartItemCount})</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;