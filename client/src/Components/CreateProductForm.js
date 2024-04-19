import React, { useState } from 'react';
import axios from 'axios';

const CreateProductForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/products', formData);
      const newProduct = response.data;
      onProductAdded(newProduct); // Pass the new product to the parent component
      alert('Product created successfully');
      // Reset the form data after successful submission
      setFormData({
        name: '',
        price: '',
        description: '',
        imageUrl: ''
      });
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Product Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Image URL:
        <input
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Create Product</button>
    </form>
  );
};

export default CreateProductForm;
