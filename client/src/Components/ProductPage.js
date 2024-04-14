import React, { useState, useEffect } from 'react';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const productsData = await response.json();
          setProducts(productsData);
        } else {
          throw new Error('Failed to fetch products');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to ensure useEffect runs only once

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Show an error message if fetching fails
  }

  return (
    <div className="product-page-container">
      <h2>Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image_url} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
