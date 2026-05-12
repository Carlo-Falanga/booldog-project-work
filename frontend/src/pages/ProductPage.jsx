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

  console.log(wishlist);

  const [dataProduct, setDataProduct] = useState(null);

  const [asideCart, setAsideCart] = useState(false);

  const [productQuantity, setProductQuantity] = useState(1);

  const { slug } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${slug}`)
      .then((res) => setDataProduct(res.data));
  }, [slug]);

  // funzione aggiungi al carrello
  const addToCart = () => {
    // verifico se il prodotto esiste nel carrello
    const existingProduct = cart.find((item) => item.id === dataProduct.id);

    // se esiste aggiorno la quantità del prodotto esistente
    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.id === dataProduct.id
          ? { ...item, quantity: item.quantity + productQuantity }
          : item,
      );
      setCart(updatedCart);
      // se non esiste aggiungo nuovo prodotto con quantità 1
    } else {
      setCart([...cart, { ...dataProduct, quantity: productQuantity }]);
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

    console.log(existingProductWL);
  };

  return (
    <div className="container py-5">
      {dataProduct && (
        <div className="">
          <div className="row row-cols-2">
            <div className="">
              <button onClick={addToWishList} className="btn">
                <i
                  className={`bi ${existingProductWL ? "bi-heart-fill" : "bi-heart"}`}
                ></i>
              </button>
              <img
                className="img-fluid"
                src={`http://localhost:3000/images/products/${dataProduct.img_url}`}
                alt={dataProduct.name}
              />
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <div className="p-5 text-center">
                <h1>{dataProduct.name}</h1>
                <p>{dataProduct.description}</p>
                <p>{dataProduct.price} €</p>
                <div className="d-flex">
                  <button onClick={decreaseQuantity}>-</button>
                  <div>{productQuantity}</div>
                  <button onClick={increaseQuantity}>+</button>
                </div>
                <button onClick={addToCart} className="btn btn-primary">
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
                  <ProductCard product={product} />
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
