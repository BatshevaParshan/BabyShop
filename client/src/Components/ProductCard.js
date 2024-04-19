import React from 'react';
import axios from 'axios';

const ProductCard = ({ product }) => {
  
  const addToCart = async () => {
    try {
      const response = await fetch(`/add-to-cart/${product.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: 1 }), // Assuming quantity is 1
      });
      const data = await response.json();
      if (data.ok) {
        console.log('Product added to cart:', product.name);
  
        // Add product to local storage
        const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        storedCartItems.push(product);
        localStorage.setItem('cart', JSON.stringify(storedCartItems));
      } else {
        console.error('Error adding product to cart:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="product-item">
      <img src={product.image_url} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <p>{product.description}</p>
      {localStorage.getItem('user-token') && (
        <button onClick={addToCart}>Add To Cart</button>
      )}
    </div>
  );
};

export default ProductCard;