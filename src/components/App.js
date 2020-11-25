import React, { useEffect, useState } from "react";
import { products } from "../data.json";
import Cart from "./Cart";
import Main from "./Main";
import Sidebar from "./Sidebar";

function App() {
  const [sizes, setSizes] = useState(
    [
      ...new Set(products.map((product) => product.availableSizes).flat()),
    ].map((size) => ({ label: size, checked: false }))
  );

  const [allProducts, setAllProducts] = useState(products);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItem")) || []
  );

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItems));
  }, [cartItems]);

  const filterSizes = (selectedSize) => {
    let updatedSizes = sizes.map((size) => {
      if (size.label === selectedSize) {
        return {
          ...size,
          checked: !size.checked,
        };
      }
      return size;
    });

    let selectedSizes = updatedSizes
      .filter((singleSize) => singleSize.checked)
      .map((size) => size.label);

    setSizes(updatedSizes);

    let updatedProduct = selectedSizes
      .map((size) =>
        products.filter((product) => product.availableSizes.includes(size))
      )
      .flat();

    let uniqueArr = [];

    updatedProduct.map((product) => {
      if (!uniqueArr.find((p) => p.id === product.id)) {
        uniqueArr = uniqueArr.concat(product);
      }
      return product;
    });

    setAllProducts(uniqueArr.length < 1 ? products : uniqueArr);
  };

  const sortHigh = () => {
    let highSort = [...products].sort((a, b) => b.price - a.price);
    setAllProducts(highSort);
  };

  const sortLow = () => {
    let lowSort = [...products].sort((a, b) => a.price - b.price);
    setAllProducts(lowSort);
  };

  return (
    <main>
      <aside>
        <Sidebar sizes={sizes} filterSizes={filterSizes} />
      </aside>
      <section>
        <Main
          products={allProducts}
          setCartItems={setCartItems}
          sortHigh={sortHigh}
          sortLow={sortLow}
        />
      </section>
      <section>
        <Cart cartItems={cartItems} />
      </section>
    </main>
  );
}

export default App;
