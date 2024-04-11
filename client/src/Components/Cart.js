import React from 'react';

const Cart = ({ cartItems }) => {
  const getTotalPrice = () => {
    // Calculate total price of all items in the cart
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>${item.price.toFixed(2)}</p>
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
