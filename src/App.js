import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useManageCart from "./hooks/useManageCart";
import { commerce } from "./lib/commerce";
import Navbar from "./Navbar";
import Products from "./Products";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Home from "./Home";
import Footer from "./Footer";
import styles from "./styles/AppStyles.module.css";

function App() {
  const [products, setProducts] = useState([]);
  const [
    cart,
    fetchCart,
    handleAddToCart,
    handleUpdateCartQuantity,
    handleRemoveFromCart,
    handleEmptyCart,
    refreshCart,
  ] = useManageCart();

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Navbar totalItems={cart.total_items} />
        <main>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home products={products} handleAddToCart={handleAddToCart} />
              }
            />
            <Route
              exact
              path="/store"
              element={
                <Products
                  products={products}
                  handleAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              exact
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  handleUpdateCartQuantity={handleUpdateCartQuantity}
                  handleRemoveFromCart={handleRemoveFromCart}
                  handleEmptyCart={handleEmptyCart}
                />
              }
            />
            <Route
              exact
              path="/checkout"
              element={<Checkout cart={cart} refreshCart={refreshCart} />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
