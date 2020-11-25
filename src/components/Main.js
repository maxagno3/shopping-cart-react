import React from "react";
import uuid from "react-uuid";

function Main({ products, setCartItems, sortHigh, sortLow }) {
  return (
    <>
      <button onClick={() => sortHigh()}>Low to High</button>
      <button onClick={() => sortLow()}>High to Low</button>
      <ul>
        {products.map((product) => {
          return (
            <li key={uuid()}>
              <img
                src={`/static/products/${product.sku}_1.jpg`}
                alt="coming soon..."
              />
              <h2>{product.title}</h2>
              <p>Price: {product.currencyFormat + product.price}</p>
              <button
                onClick={() =>
                  setCartItems((prevState) => {
                    let index = prevState.findIndex((p) => p.id === product.id);

                    let final = prevState;
                    if (index !== -1) {
                      final = prevState.map((product, i) => {
                        if (i === index) {
                          return {
                            ...product,
                            quantity: product.quantity + 1,
                          };
                        }
                        return product;
                      });
                    } else {
                      final = prevState.concat({ ...product, quantity: 1 });
                    }
                    return final;
                  })
                }
              >
                Add to cart
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Main;
