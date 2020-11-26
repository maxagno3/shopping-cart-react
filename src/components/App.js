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
  const [selectValue, setSelectValue] = useState("");

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

  const sortProducts = (event) => {
    setSelectValue(event.target.value);

    if (event.target.value === "low") {
      let lowSort = [...products].sort((a, b) => a.price - b.price);
      setAllProducts(lowSort);
    } else if (event.target.value === "high") {
      let highSort = [...products].sort((a, b) => b.price - a.price);
      setAllProducts(highSort);
    } else {
      setAllProducts(products);
    }
  };

  const removeCartItems = (cartItemId) => {
    const removeItem = cartItems.filter(
      (cartItem) => cartItem.id !== cartItemId
    );
    setCartItems(removeItem);
  };

  const increaseQuantity = (id) => {
    const increment = cartItems.filter((item) => {
      return item.id === id ? (item.quantity += 1) : item;
    });
    setCartItems(increment);
  };

  const decreaseQuantity = (id) => {
    const decrement = cartItems.filter((item) => {
      return item.id === id ? (item.quantity -= 1) : item;
    });
    setCartItems(decrement);
  };

  return (
    <main className="container mx-auto">
      <aside>
        <Sidebar sizes={sizes} filterSizes={filterSizes} />
      </aside>
      <section>
        <Main
          products={allProducts}
          setCartItems={setCartItems}
          selectValue={selectValue}
          sortProducts={sortProducts}
        />
      </section>
      <section>
        <Cart
          cartItems={cartItems}
          removeCartItems={removeCartItems}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
      </section>
    </main>
  );
}

export default App;
