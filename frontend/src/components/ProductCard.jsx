import { useWishlist } from "../context/WishListContext";
import { Link, useParams } from "react-router-dom";

export default function ProductCard({ product }) {
  const { wishlist, setWishlist } = useWishlist();

  // verifico se il prodotto esiste nel carrello
  const existingProductWL = wishlist.find((item) => item.slug === product.slug);

  // funzione aggiungi wishlist
  const addToWishList = () => {
    // se esiste al click lo rimuovo
    if (existingProductWL) {
      const updatedWishList = wishlist.filter((item) => item.slug !== product.slug);
      setWishlist(updatedWishList);
    } else {
      // altrimenti lo aggiungo
      setWishlist([...wishlist, { ...product }]);
    }
  };

  return (

    <div className="border rounded-3 overflow-hidden h-100 position-relative">
      <button onClick={addToWishList} className="btn position-absolute end-0 z-1 border-0">
        <i className={`bi ${existingProductWL ? "bi-heart-fill" : "bi-heart"}`}></i>
      </button>
      <Link to={`/product/${product.slug}`} className=' text-decoration-none text-reset'>
        <div className="ratio ratio-1x1">
          <div className="d-flex align-items-center justify-content-center">
            <img className="w-100 h-100 object-fit-contain" src={`http://localhost:3000/images/products/${product.img_url}`} alt={`${product.name}'s picture`} />
          </div>
        </div>
        <div className="px-3 pt-3 pb-4">
          <div className="cart-meta mb-3">{product.category}</div>
          <h3 className="cart-name h5">{product.name}</h3>
          <div className="border-top pt-3">
            <div className="cart-name fs-4">{product.price} €</div>
          </div>
        </div>
      </Link>


    </div>
  );
}
