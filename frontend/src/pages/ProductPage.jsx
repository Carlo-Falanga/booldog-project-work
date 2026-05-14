import { createContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useGlobal } from "../context/CartContext";
import { useWishlist } from "../context/WishListContext";
import ProductCard from "../components/ProductCard";
import SideCart from "../components/SideCart";

export default function ProductPage() {

  const {
    cart,
    setCart,
    asideCart,
    setAsideCart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
    productQuantity,
    setProductQuantity,
  } = useGlobal();

  const {
    wishlist,
    setWishlist,
    addToWishList,
    isInWishList
  } = useWishlist();

  const [dataProduct, setDataProduct] = useState(null);

  const { slug } = useParams();

  const addedToWishList = isInWishList(slug)

  useEffect(() => {
    setProductQuantity(1);
    axios
      .get(`http://localhost:3000/products/${slug}`)
      .then((res) => setDataProduct(res.data));
  }, [slug]);

  // controllo se questo prodotto è già nel carrello e con che quantità
  const existingInCart = cart.find((p) => p.id === dataProduct?.id);
  const quantityInCart = existingInCart ? existingInCart.quantity : 0;

  // quanti pezzi può ancora aggiungere l'utente al carrello
  const stock = dataProduct?.stock ?? 0;
  const remainingStock = stock - quantityInCart;

  // disabilito il "+" se la prossima aggiunta supererebbe lo stock
  const isPlusDisabled = productQuantity >= remainingStock;

  // disabilito "Aggiungi al carrello" se non c'è più stock disponibile
  const isAddDisabled = remainingStock <= 0;

  // verifico se il prodotto esiste nel carrello
  const existingProductWL = wishlist.find((item) => item.slug === slug);

  return (
    <section>
      <div className="container-lg py-5">
        {dataProduct && (
          <div>
            <div className="row">

              <div className="col-lg-6">
                <div className="ratio ratio-1x1">
                  <div className="d-flex align-items-center justify-content-center">
                    <button
                      onClick={() => addToWishList(dataProduct)}
                      className="btn position-absolute end-0 top-0"
                    >
                      <i
                        className={`bi ${addedToWishList ? "bi-heart-fill" : "bi-heart"}`}
                      ></i>
                    </button>
                    <img
                      className="w-100 h-100 object-fit-contain"
                      src={`http://localhost:3000/images/products/${dataProduct.img_url}`}
                      alt={dataProduct.name}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="p-5 text-center">
                    <h1>{dataProduct.name}</h1>
                    <p>{dataProduct.description}</p>
                    <p>{dataProduct.price} €</p>

                    <div className="btn-group mb-3">
                      <button
                        onClick={decreaseQuantity}
                        type="button"
                        disabled={productQuantity <= 1}
                        className="btn btn-outline-secondary btn-sm rounded-start-pill border-end-0 increse_decrease_btn"
                      >
                        -
                      </button>
                      <div className="btn btn-outline-secondary btn-sm px-3 border-start-0 border-end-0">
                        {productQuantity}
                      </div>
                      <button
                        onClick={() => increaseQuantity(dataProduct.stock, quantityInCart)}
                        type="button"
                        disabled={isPlusDisabled}
                        className="btn btn-outline-secondary btn-sm rounded-end-pill border-start-0 increse_decrease_btn"
                      >
                        +
                      </button>
                    </div>

                    {/* messaggio informativo sullo stock */}
                    {stock === 0 && (
                      <p className="text-danger small mb-2">Prodotto esaurito</p>
                    )}
                    {stock > 0 && remainingStock <= 0 && (
                      <p className="text-warning small mb-2">
                        Hai già tutti i pezzi disponibili nel carrello
                      </p>
                    )}

                    <button
                      onClick={() => addToCart(dataProduct, productQuantity)}
                      disabled={isAddDisabled}
                      className="btn btn-dark btn-lg w-100 rounded-pill py-3 mb-4 d-flex align-items-center justify-content-center gap-2 border-0 btn_cart"
                    >
                      {stock === 0 ? "Esaurito" : "Aggiungi al carrello"}
                    </button>
                  </div>
                </div>
              </div>

            </div>

            <div className="py-5">
              <h3>Prodotti correlati</h3>
              <div className="row row-cols-4">
                {dataProduct.related.map((product) => (
                  <div key={product.slug}>
                    <ProductCard
                      product={product}
                      addToCart={() => addToCart(product, 1)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
