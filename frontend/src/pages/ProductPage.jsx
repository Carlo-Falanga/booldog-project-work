import { createContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useGlobal } from "../context/CartContext";
import { useWishlist } from "../context/WishListContext";
import ProductCard from "../components/ProductCard";

import SideCart from "../components/SideCart";

export default function ProductPage() {
  const { cart, setCart } = useGlobal();
  const { wishlist, setWishlist } = useWishlist();

  const [dataProduct, setDataProduct] = useState(null);

  const [asideCart, setAsideCart] = useState(false);

  useEffect(() => {
    if (asideCart) {
      document.body.classList.add("overflow-hidden");
    }
    else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [asideCart]);

  const [productQuantity, setProductQuantity] = useState(1);

  const { slug } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${slug}`)
      .then((res) => setDataProduct(res.data));
  }, [slug]);

  // funzione aggiungi al carrello
  const addToCart = (item, quantity = 1) => {
    // verifico se il prodotto esiste nel carrello
    const existingProduct = cart.find((product) => product.id === item.id);

    // se esiste aggiorno la quantità del prodotto esistente
    if (existingProduct) {
      const updatedCart = cart.map((product) =>
        product.id === item.id
          ? { ...product, quantity: product.quantity + quantity }
          : product,
      );
      setCart(updatedCart);
      // se non esiste aggiungo nuovo prodotto con quantità 1
    } else {
      setCart([...cart, { ...item, quantity: quantity }]);
    }

    setAsideCart(true);
    setProductQuantity(1);
  };

  // aumento quantità da aggiungere al carrello con stock come massimale
  // come massimale andrà inserito stock meno quantità già nel carrello
  const increaseQuantity = () => {
    if (productQuantity < dataProduct?.stock) {
      setProductQuantity(productQuantity + 1);
    }
  };

  // diminuisco quantità da aggiungere al carrello se maggiore di 1
  const decreaseQuantity = () => {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
    }
  };

  // verifico se il prodotto esiste nel carrello
  const existingProductWL = wishlist.find((item) => item.slug === slug);

  // funzione aggiungi wishlist
  const addToWishList = () => {
    // se esiste al click lo rimuovo
    if (existingProductWL) {
      const updatedWishList = wishlist.filter((item) => item.slug !== slug);
      setWishlist(updatedWishList);
    } else {
      // altrimenti lo aggiungo
      setWishlist([...wishlist, { ...dataProduct }]);
    }

  };

  return (
    <div className="container py-5">
      {dataProduct && (
        <div>
          <div className="row row-cols-2">

            <div>
              <div className="ratio ratio-1x1">
                <div className="d-flex align-items-center justify-content-center">
                  <button onClick={addToWishList} className="btn position-absolute end-0 top-0">
                    <i className={`bi ${existingProductWL ? "bi-heart-fill" : "bi-heart"}`}></i>
                  </button>
                  <img className="w-100 h-100 object-fit-contain" src={`http://localhost:3000/images/products/${dataProduct.img_url}`} alt={dataProduct.name} />
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-center">
              <div className="p-5 text-center">
                <h1>{dataProduct.name}</h1>
                <p>{dataProduct.description}</p>
                <p>{dataProduct.price} €</p>

                <div className="btn-group mb-3">
                  <button onClick={decreaseQuantity} type="button" className="btn btn-outline-secondary btn-sm rounded-start-pill border-end-0 increse_decrease_btn">-</button>
                  <div className="btn btn-outline-secondary btn-sm px-3 border-start-0 border-end-0">{productQuantity}</div>
                  <button onClick={increaseQuantity} type="button" className="btn btn-outline-secondary btn-sm rounded-end-pill border-start-0 increse_decrease_btn">+</button>
                </div>

                <button onClick={() => addToCart(dataProduct, productQuantity)} className="btn btn-dark btn-lg w-100 rounded-pill py-3 mb-4 d-flex align-items-center justify-content-center gap-2 border-0 btn_cart">
                  Aggiungi al carrello
                </button>
              </div>
            </div>
          </div>

          <div className="py-5">
            <h3>Related</h3>
            <div className="row row-cols-4">
              {dataProduct.related.map((product) => (
                <div key={product.slug}>
                  <ProductCard product={product} addToCart={() => addToCart(product)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {asideCart && <SideCart setAsideCart={setAsideCart} />}
    </div>
  );
}
