import React from "react";
import uuid from "react-uuid";

function Cart({ cartItems }) {
  return (
    <div>
      <ul>
        {cartItems.map((cartItem) => (
          <li key={uuid()}>
            <img
              src={`/static/products/${cartItem.sku}_2.jpg`}
              alt="coming soon..."
            />
            <p>{cartItem.title}</p>
            <h2>Quantity: {cartItem.quantity}</h2>
            <p>Price: {cartItem.currencyFormat + cartItem.price}</p>
          </li>
        ))}
      </ul>
      <p>
        Total:
        {cartItems.reduce((acc, cv) => {
          acc = acc + cv.price * cv.quantity;
          return acc.toFixed(2);
        }, 0)}
      </p>
    </div>
  );
}

export default Cart;
