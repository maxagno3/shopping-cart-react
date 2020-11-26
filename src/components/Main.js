import React from "react";
import uuid from "react-uuid";

function Main({ products, setCartItems, selectValue, sortProducts }) {
  return (
    <>
      <select value={selectValue} onChange={sortProducts} className="bg-red-300 text-center ml-5">
        <option value="none">------</option>
        <option value="high">Sort to high</option>
        <option value="low">Sort to low</option>
      </select>
      <ul className="flex flex-wrap mx-auto">
        {products.map((product) => {
          return (
            <li key={uuid()} className="m-4">
              <img
                src={`/static/products/${product.sku}_1.jpg`}
                alt="coming soon..."
              />
              <h2 className="text-2xl text-gray-900 font-bold">
                {product.title}
              </h2>
              <p className="font-bold text-xl">
                Price: {product.currencyFormat + product.price}
              </p>
              <button
                className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none my-4"
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
