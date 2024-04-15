import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login'; // Import the Login component
import './Home.css'; // Import CSS file for styling

const Home = ({ isLoggedIn, onLogin }) => {
  return (
    <div className="home-container">
      <h2 className="welcome-message">Welcome to BabyShop!</h2>
      <img src="/babyimage.jpeg" alt="BabyShop Logo" className="home-logo" />
      <p className="intro-text">Discover a world of adorable baby products and essentials.</p>
      <div className="featured-products">
        <div className="product-item">
          <img src="/path_to_featured_product_1_image" alt="Product 1" className="product-image" />
          <h3>Featured Product 1</h3>
          <p>Description of the featured product.</p>
        </div>
        <div className="product-item">
          <img src="/path_to_featured_product_2_image" alt="Product 2" className="product-image" />
          <h3>Featured Product 2</h3>
          <p>Description of the featured product.</p>
        </div>
        <div className="product-item">
          <img src="/path_to_featured_product_3_image" alt="Product 3" className="product-image" />
          <h3>Featured Product 3</h3>
          <p>Description of the featured product.</p>
        </div>
      </div>
      <p className="explore-text">Explore our range of baby clothes, accessories, toys, and more!</p>
      
      {/* Display the Login component if the user is not logged in */}
      {!isLoggedIn && <Login onLogin={onLogin} isLoggedIn={isLoggedIn} />}
    </div>
  );
}

export default Home;

