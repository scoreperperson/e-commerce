import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart } from "./components";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    const cartData = await commerce.cart.retrieve();
    setCart(cartData);
  };
  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };
  const handleUpdateCartQty = async (productId, quantity) => {
    // quantity goes in a curley bracket because it is the payload and is what will be changing in the put
    const response = await commerce.cart.update(productId, { quantity });
    setCart(response.cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const response = await commerce.cart.remove(productId);
    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response.cart);
  };
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart.cart);
  };
  useEffect(() => {
    fetchProducts();
    fetchCart();
   
  }, []);
  console.log(cart);
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar cart={cart} />
          <Routes>
            <Route
              exact
              path="/"
              element={<Products products={products} cart={cart} handleAddToCart={handleAddToCart}/>}
            />

            <Route
              exact
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  
                  onUpdateCartQty={handleUpdateCartQty}
                  onRemoveFromCart={handleRemoveFromCart}
                  onEmptyCart={handleEmptyCart}
                />
              }
            />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
{
  /* <Products
products={products}
cart={cart}
handleAddToCart={handleAddToCart}
/> */
}
{
  /* <Cart cart={cart} /> */
}
