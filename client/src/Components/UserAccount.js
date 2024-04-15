import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const UserAccount = ({ isLoggedIn, onLogout, addProductToList }) => {
  const history = useHistory();
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    category: '',
    description: '',
    imageUrl: '',
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/login'); // Redirect to login if not logged in
    }
  }, [isLoggedIn, history]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProduct(prevState => ({ ...prevState, [name]: value }));
    if (name === 'imageUrl') {
      setImagePreview(value);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5555/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const addedProduct = await response.json();
        console.log('Product added successfully:', addedProduct);
        if (addProductToList) {
          addProductToList(addedProduct.product);
        }
        setSubmitSuccess(true);
        setProduct({
          name: '',
          brand: '',
          category: '',
          description: '',
          imageUrl: '',
        });
        setImagePreview('');
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
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
