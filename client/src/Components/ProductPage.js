import React from 'react';

const ProductPage = () => {
  // You can fetch product data from backend API here
  // Placeholder product data for demonstration
  const products = [
    { id: 1, name: 'Car Seat', price: 99.99, image: 'path_to_image' },
    { id: 2, name: 'Stroller', price: 149.99, image: 'path_to_image' },
    { id: 3, name: 'Bassinet', price: 79.99, image: 'path_to_image' },
  ];

  return (
    <div className="product-page-container">
      <h2>Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
