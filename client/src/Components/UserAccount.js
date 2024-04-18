import React, { useState, useEffect } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import axios from "axios";

const UserAccount = ({ isLoggedIn, onLogout, addProductToList }) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    category_id: '',
    description: '',
    image: ''
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

  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
}

  var data = new FormData();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Make sure to replace 'http://localhost:5555/add-product' with your actual API endpoint
    // const response = await fetch('http://localhost:5000/add-product', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'user-token': localStorage.getItem("user-token")
    //   },
    //   body: JSON.stringify(product),
    // });

    // if (response.ok) {
    //   const addedProduct = await response.json();
    //   console.log("Product added successfully:", addedProduct);
    //   window.alert(addedProduct.message)
    //   // If addProductToList prop is provided, call it to update the product list in parent component
    //   if (addProductToList) {
    //     addProductToList(addedProduct.product); // Your backend returns the added product under the 'product' key
    //   }
    //   setSubmitSuccess(true); // Set success status
    //   // Clear form fields after successful submission
    //   setProduct({
    //     name: '',
    //     price: '',
    //     brand: '',
    //     category_id: '',
    //     description: '',
    //     image: ''
    //   });
    //   setImagePreview(''); // Clear image preview
    // } else {
    //   // Handle server errors or invalid inputs
    //   const errorData = await response.json()
    //   console.log(errorData)
    //   window.alert(errorData.error)
    //   console.error("Failed to add product");
    // }
    
    const url = 'http://127.0.0.1:5000/add-product'
        data.append("name", product.name);
        data.append("price", product.price);
        data.append("description", product.description);
        data.append("category_id", product.category_id);
        data.append("image", product.image);
        axios({
            url,
            method: "POST",
            headers: {
                "user-token": localStorage.getItem("user-token")
            },
            data
        }).then(res => { 
            console.log(res)
            window.alert(res.data.message);
        }).catch((error) => { window.alert(error.data.error) })
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
          Price
          <input
            type="number"
            name="price"
            value={product.price}
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
          Category ID
          <input
            type="number"
            name="category_id"
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
            type="file"
            name="imageUrl"
            onChange={handleFileChange}
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