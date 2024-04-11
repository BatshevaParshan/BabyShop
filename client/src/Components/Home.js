import React from 'react';

const Home = () => {
  return (
    <div className="home-container">
      <h2 className="welcome-message">Welcome to BabyShop!</h2>
      <img src="path_to_your_baby_logo" alt="BabyShop Logo" className="home-logo" />
      <p className="intro-text">Discover a world of adorable baby products and essentials.</p>
      <div className="featured-products">
        <div className="product-item">
          <img src="path_to_product_image" alt="Product" className="product-image" />
          <h3>Featured Product 1</h3>
          <p>Description of the featured product.</p>
        </div>
        <div className="product-item">
          <img src="path_to_product_image" alt="Product" className="product-image" />
          <h3>Featured Product 2</h3>
          <p>Description of the featured product.</p>
        </div>
        <div className="product-item">
          <img src="path_to_product_image" alt="Product" className="product-image" />
          <h3>Featured Product 3</h3>
          <p>Description of the featured product.</p>
        </div>
      </div>
      <p className="explore-text">Explore our range of baby clothes, accessories, toys, and more!</p>
    </div>
  );
}

export default Home;
