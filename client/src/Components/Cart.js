import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
  }, [localStorage.getItem('cart')]); // Add local storage as a dependency

  const fetchCartItemCount = async () => {
    try {
      const response = await axios.get('/api/cart/items/count');
      const itemCount = response.data.count;
      console.log('Number of items in cart:', itemCount);
      // Use the retrieved item count as needed in your component
    } catch (error) {
      console.error('Error fetching cart item count:', error);
      // Handle error fetching cart item count
    }
  };
 // Call the fetchCartItemCount function when needed, such as on component mount
useEffect(() => {
  fetchCartItemCount();
}, [cartItems]); // Add cartItems as a dependency
  
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity || 0), 0);
  };

  const handleRemoveItem = async (itemId) => {
    console.log(`Removing item with ID: ${itemId}`);

    try {
      await axios.delete(`/remove-from-cart/${itemId}`);

      // Filter out the removed item from cartItems state
      const updatedCartItems = cartItems.filter(item => item.id !== itemId);

      // Update cartItems state and local storage after successful removal
      setCartItems(updatedCartItems);
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));

      // Display success toast notification
      toast.success('Item removed from cart', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  
  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      console.log(`Sending PATCH request to /update-cart/${itemId} with quantity ${newQuantity}`);
      const response = await axios.patch(`/update-cart/${itemId}`, { quantity: newQuantity });
  
      console.log('Response from server:', response.data);
  
      if (response.data.ok) {
        if (response.data.message === 'Cart item updated') {
          const updatedItem = response.data.updatedItem;
  
          const updatedCartItems = cartItems.map(item => 
            item.id === itemId ? { ...item, quantity: updatedItem.quantity } : item
          );
  
          console.log('Updated cart items:', updatedCartItems);
  
          setCartItems(updatedCartItems);
          localStorage.setItem('cart', JSON.stringify(updatedCartItems));
          
          toast.success('Quantity updated', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          // This case handles the 'Item not found in cart, no update performed'
          toast.info(response.data.message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } else {
        // This is just a safety check; backend currently always returns ok: True
        throw new Error('Backend indicated operation was not successful.');
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
      toast.error('Failed to update cart item. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <ToastContainer />
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image_url} alt={item.name} />
              <p>{item.name}</p>
              <p>${item.price.toFixed(2)}</p>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
              />
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
