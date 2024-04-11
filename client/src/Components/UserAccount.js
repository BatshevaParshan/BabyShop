import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserAccount = ({ isLoggedIn, onLogout, addProductToList }) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    category: '',
    description: '',
    imageUrl: '', // Ensure this field is included for the image URL
  });
  const [submitSuccess, setSubmitSuccess] = useState(false); // State to track successful submission
  const [imagePreview, setImagePreview] = useState(''); // State to store image preview URL

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct(prevState => ({ ...prevState, [name]: value }));
    if (name === 'imageUrl') {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Make sure to replace 'http://localhost:5555/add-product' with your actual API endpoint
    const response = await fetch('http://localhost:5555/add-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      const addedProduct = await response.json();
      console.log("Product added successfully:", addedProduct);
      // If addProductToList prop is provided, call it to update the product list in parent component
      if (addProductToList) {
        addProductToList(addedProduct.product); // Your backend returns the added product under the 'product' key
      }
      setSubmitSuccess(true); // Set success status
      // Clear form fields after successful submission
      setProduct({
        name: '',
        brand: '',
        category: '',
        description: '',
        imageUrl: '',
      });
      setImagePreview(''); // Clear image preview
    } else {
      // Handle server errors or invalid inputs
      console.error("Failed to add product");
    }
  };

  return (
    <div className="user-account-container">
      <h2>User Account</h2>
      <button onClick={onLogout}>Logout</button>
      <form onSubmit={handleSubmit}>
        {submitSuccess && (
          <div className="success-message">
            Product successfully added! Check it out in the store.
          </div>
        )}
        <label>
          Name
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Brand
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Category
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Description
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Image URL
          <input
            type="text"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleInputChange}
            required
          />
        </label>
        {imagePreview && <img src={imagePreview} alt="Product Preview" style={{ maxWidth: '200px' }} />}
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default UserAccount;
