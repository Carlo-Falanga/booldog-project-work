import { useWishlist } from "../context/WishListContext";
import { Link, useParams } from "react-router-dom";

export default function ProductCard({ product, addToCart }) {

  const { wishlist, setWishlist, addToWishList, isInWishList } = useWishlist();

  const addedToWishList = isInWishList(product.slug)

  return (

    <div className="border rounded-3 overflow-hidden h-100 position-relative">
      <button onClick={() => addToWishList(product)} className="btn position-absolute end-0 z-1 border-0">
        <i className={`bi ${addedToWishList ? "bi-heart-fill" : "bi-heart"}`}></i>
      </button>
      <div className="text-decoration-none text-reset">

        <Link to={`/product/${product.slug}`}>
          <div className="ratio ratio-1x1">
            <div className="d-flex align-items-center justify-content-center">
              <img className="w-100 h-100 object-fit-contain" src={`http://localhost:3000/images/products/${product.img_url}`} alt={`${product.name}'s picture`} />
            </div>
          </div>
        </Link>

        <div className="px-3 pt-3 pb-4">
          <div className="cart-meta mb-3">{product.category}</div>
          <h3 className="cart-name h5">{product.name}</h3>

          <div className="border-top pt-3 d-flex align-items-center justify-content-between">
            <div className="cart-name fs-4">{product.price} €</div>
            <div className="">
              <button
                onClick={addToCart}
                className="btn btn-dark btn-sm px-3 rounded-pill">
                Aggiungi al carrello
              </button>
            </div>
          </div>

        </div>
      </div>


    </div>
  );
}
