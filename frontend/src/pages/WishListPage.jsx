import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishListContext";
import ProductCard from "../components/ProductCard";
import ProductCardList from "../components/ProductCardList";
import { useState } from "react";

export default function WishListPage() {

  const [listView, setListView] = useState(true)

  const { wishlist } = useWishlist();

  return (
    <section className="py-5">
      <div className="container">
        <h1 className="cart-hero mt-3 mb-5">
          <span className="d-block">La tua</span>
          <em className="d-block">Wishlist.</em>
        </h1>
        <div className="d-flex">
          <button onClick={() => setListView(false)}>List</button>
          <button onClick={() => setListView(true)}>grid</button>
        </div>

        <div className="row g-4 g-lg-3">
          {wishlist.map((product) => (
            listView ?
              (
                <div key={product.slug} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <ProductCard product={product} />
                </div>
              )
              :
              (
                <div key={product.slug} className="col-12">
                  <ProductCardList product={product} />
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
      </div>
    </section >
  );
}
