import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/products');
      setProducts(response.data.products || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductAdded = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div className="product-page-container">
      <h2>Products</h2>
      {/* AddProductForm component should be replaced with your CreateProductForm component */}
      {/* <AddProductForm onProductAdded={handleProductAdded} /> */}
      <div className="featured-products">
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductPage;
