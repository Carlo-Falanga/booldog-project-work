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

  console.log(dataProduct)

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
      <div className="container-lg py-3">
        {dataProduct && (
          <div>
            <div className="row">

              <div className="col-10 col-md-5 col-lg-6 offset-1 offset-md-0">
                <div className="ratio ratio-1x1">
                  <div className="d-flex align-items-center justify-content-center">
                    <button
                      onClick={() => addToWishList(dataProduct)}
                      className="btn btn-wishlist position-absolute top-0 end-0 rounded-circle aspect-ratio-1x1 border d-flex align-items-center justify-content-center cursor-pointer"
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

              <div className="col-md-7 col-lg-6 d-flex align-items-center justify-content-center">
                <div className="px-lg-5">
                  <div className="cart-meta mb-3">
                    {dataProduct.category} {dataProduct.animal_name}
                  </div>
                  <h1 className="display-3 lh-1 fw-normal">{dataProduct.name}</h1>
                  <p>{dataProduct.description}</p>
                  <div className="cart-meta mb-5">
                    {dataProduct.size} {dataProduct.color} {dataProduct.material}
                  </div>
                  <div className="border-top py-4">
                    <p className="h1 mb-0">{dataProduct.price} €</p>
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

                  <div className="row gx-2">
                    <div className="col-auto">
                      <div className="quantity-controls rounded-pill bg-paper border d-flex">
                        <button
                          onClick={decreaseQuantity}
                          type="button"
                          disabled={productQuantity <= 1}
                          className="btn py-3 border-0"
                        >
                          -
                        </button>
                        <div className="d-flex align-items-center justify-content-center">
                          <span>{productQuantity}</span>
                        </div>
                        <button
                          onClick={() => increaseQuantity(dataProduct.stock, quantityInCart)}
                          type="button"
                          disabled={isPlusDisabled}
                          className="btn py-3 border-0"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col">
                      <button
                        onClick={() => addToCart(dataProduct, productQuantity)}
                        disabled={isAddDisabled}
                        className="btn btn-dark w-100 py-3 rounded-pill border-0 btn_cart"
                      >
                        {stock === 0 ? "Esaurito" : "Aggiungi al carrello"}
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            <div className="py-5">
              <h3>Prodotti correlati</h3>
              <div className="row row-cols-2 row-cols-md-4 g-2 g-lg-3">
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
