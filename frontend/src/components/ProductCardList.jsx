import { useWishlist } from "../context/WishListContext";
import { Link, useParams } from "react-router-dom";

export default function ProductCardList({ product, addToCart }) {

  const { wishlist, setWishlist, addToWishList, isInWishList } = useWishlist();

  const addedToWishList = isInWishList(product.slug)

  return (

    <div className="card p-3 h-100 position-relative product-card">
      <div className='text-decoration-none text-reset row'>

        <div className="col-2">
          <button onClick={() => addToWishList(product)} className="position-absolute start-0 pe-4 z-1 border-0">
            <i className={`bi ${addedToWishList ? "bi-heart-fill" : "bi-heart"}`}></i>
          </button>
          <Link to={`/product/${product.slug}`}>
            <div className="ratio ratio-1x1">
              <div className="d-flex align-items-center justify-content-center">
                <img className="w-100 h-100 object-fit-contain product-card-img" src={`http://localhost:3000/images/products/${product.img_url}`} alt={`${product.name}'s picture`} />
              </div>
            </div>
          </Link>
        </div>
        <div className="col-8">
          <div>{product.category} {product.animal_name}</div>
          <h3 className="card-title">{product.name}</h3>
          <div className=" fs-4">&euro; {product.price}</div>
        </div>

        <div className="col-2">
          <button
            onClick={addToCart}
            className="btn btn-dark btn-sm px-3 rounded-pill">
            Aggiungi al carrello
          </button>
        </div>
      </div>
    </div >
  );
}
