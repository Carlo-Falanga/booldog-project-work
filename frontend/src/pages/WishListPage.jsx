import { Link } from "react-router-dom";
import { useGlobal } from "../context/CartContext";
import { useWishlist } from "../context/WishListContext";
import ProductCard from "../components/ProductCard";
import ProductCardList from "../components/ProductCardList";
import { useState } from "react";
import SideCart from "../components/SideCart";


export default function WishListPage() {

  const [listView, setListView] = useState(true)

  const { asideCart, setAsideCart, addToCart } = useGlobal();
  const { wishlist } = useWishlist();

  return (
    <section className="py-5">
      <div className="container">
        <h1 className="cart-hero mt-3 mb-5">
          <span className="d-block">La tua</span>
          <em className="d-block">Wishlist.</em>
        </h1>
        <div className="btn-group">
          <button onClick={() => setListView(false)} type="button" className="btn btn-outline-secondary btn-sm rounded-start-pill border-end-0 increse_decrease_btn"><i className="bi bi-view-list"></i></button>
          <button onClick={() => setListView(true)} className="btn btn-outline-secondary btn-sm rounded-end-pill border-start-0 increse_decrease_btn"><i className="bi bi-grid"></i></button>
        </div>

        <div className="row g-4 g-lg-3">
          {wishlist.map((product) => (
            listView ?
              (
                <div key={product.slug} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <ProductCard product={product} addToCart={() => addToCart(product, 1)} />
                </div>
              )
              :
              (
                <div key={product.slug} className="col-12">
                  <ProductCardList product={product} addToCart={() => addToCart(product, 1)} />
                </div>
              )
          ))}
        </div>

        {
          wishlist.length === 0 && (
            <div className="text-center py-5">
              <h2 className="mb-4">La tua Wishlist è vuota.</h2>
              <p className="text-muted mb-4">
                Non hai prodotti preferiti per il momento. Clicca sui cuori per
                aggiungerli qui!
              </p>
            </div>
          )
        }

        {asideCart && <SideCart setAsideCart={setAsideCart} />}

      </div>
    </section >
  );
}
