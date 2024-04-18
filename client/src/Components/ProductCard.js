import React from 'react';

function ProductCard({ product }) {
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...cart, product]; // Create a new array with the added product
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    console.log('Product added to cart:', product.name);
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
}

export default ProductCard;
