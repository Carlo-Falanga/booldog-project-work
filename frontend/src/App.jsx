import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { CartContextProvider } from "./context/CartContext";
import { WishListContextProvider } from "./context/WishListContext";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SearchPage from "./pages/SearchPage";
import WishListPage from "./pages/WishListPage";
import AnimalPage from "./pages/AnimalPage";
import OrderConfirmedPage from "./pages/OrderConfirmedPage";



function App() {

  return (


    <BrowserRouter>
      <CartContextProvider>
        <WishListContextProvider>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route index element={<HomePage />} />
              <Route path="product/:slug" element={<ProductPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishListPage />} />
              <Route path="/animal-products/:animalSlug" element={<AnimalPage />} />
              <Route path="/order-confirmed/:id" element={<OrderConfirmedPage />} />
              <Route />
            </Route>
          </Routes>
        </WishListContextProvider>
      </CartContextProvider>
    </BrowserRouter>


  );
}

export default App;
