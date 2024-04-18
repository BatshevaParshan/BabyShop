import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartProduct from './CartProduct';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const userToken = localStorage.getItem("user-token");
    if (!userToken) {
      navigate("/");
    } else {
      const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCartItems);
    }
  }, [navigate]);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price || 0), 0);
  };

  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);

    // Display toast notification for item removal
    toast.success('Item removed from cart', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <ToastContainer />
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id}>
              <CartProduct item={item} />
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </div>
          ))}
          <p>Total: ${getTotalPrice().toFixed(2)}</p>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
