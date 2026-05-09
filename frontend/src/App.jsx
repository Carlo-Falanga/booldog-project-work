import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import { useState, useEffect } from "react";
import { CartContextProvider } from "./context/CartContext";


function App() {

  const [globalCart, setGlobalCart] = useState(
    JSON.parse(localStorage.getItem("globalCart")) || []
  );

  useEffect(() => {
    localStorage.setItem("globalCart", JSON.stringify(globalCart));
  }, [globalCart]);


  return (
    <>
      <CartContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route index element={<HomePage />} />
              <Route path="product/:slug" element={<ProductPage globalCart={globalCart} setGlobalCart={setGlobalCart} />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route />
              <Route />
              <Route path="/cart" element={<CartPage />} />
              <Route />
              <Route />
              <Route />
              <Route />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartContextProvider>

    </>
  );
}

export default App;
