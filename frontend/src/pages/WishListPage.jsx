import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishListContext";
import ProductCard from "../components/ProductCard";

export default function WishListPage() {
  const { wishlist } = useWishlist();

  return (
    <section className="py-5">
    <div className="container">
              <h1 className="cart-hero mt-3 mb-5">
          <span className="d-block">La tua</span>
          <em className="d-block">Wishlist.</em>
        </h1>
      <div className="row row-cols-4">
        {wishlist.map((product) => (
          <div key={product.slug}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      {wishlist.length === 0 && (
        <div className="text-center py-5">
          <h2 className="mb-4">La tua Wishlist è vuota.</h2>
          <p className="text-muted mb-4">
            Non hai prodotti preferiti per il momento. Clicca sui cuori per
            aggiungerli qui!
          </p>
        </div>
      )}
    </div>
    </section>
  );
}
