import React from "react";
import uuid from "react-uuid";

function Cart({ cartItems, removeCartItems }) {
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
            <div className="flex items-center">
              <h2>Quantity:</h2>
              <h3 className="ml-1">{cartItem.quantity}</h3>
            </div>
            <p>Price: {cartItem.currencyFormat + cartItem.price}</p>
            {cartItem.quantity === 1 && (
              <button
                className="px-2 py-1 transition ease-in duration-200 hover:bg-red-500 hover:text-white border-2 border-gray-900 focus:outline-none my-4"
                onClick={() => removeCartItems(cartItem.id)}
              >
                Remove Item
              </button>
            )}
          </li>
        ))}
      </ul>
      <p>
        Total: $
        {cartItems.reduce((acc, cv) => {
          acc = acc + cv.price * cv.quantity;
          return acc;
        }, 0)}
      </p>
    </div>
  );
}

export default Cart;
