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
    <div className="card p-3 h-100 position-relative">
      <button onClick={addToWishList} className="btn position-absolute end-0 pe-4 z-1">
        <i
          className={`bi ${existingProductWL ? "bi-heart-fill" : "bi-heart"}`}
        ></i>
      </button>
      <Link to={`/product/${product.slug}`} className=' text-decoration-none'>
      <div className="card-img card-header p-3">
        <img
          src={`http://localhost:3000/images/products/${product.img_url}`}
          alt={`${product.name}'s picture`}
        />
      </div>
      <div className=" d-flex align-items-center justify-content-between opacity-75 px-3 pt-3">
        <div>{product.category}</div>
        <div>{product.animal_name}</div>
      </div>
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <div className=" fs-4"> &euro; {product.price}</div>
      </div>
      </Link>
    </div>
  );
}
