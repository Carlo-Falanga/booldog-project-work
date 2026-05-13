import { useWishlist } from "../context/WishListContext";
import { Link, useParams } from "react-router-dom";

export default function ProductCardList({ product, addToCart }) {
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
      <button onClick={addToWishList} className="btn position-absolute start-0 pe-4 z-1 border-0">
        <i className={`bi ${existingProductWL ? "bi-heart-fill" : "bi-heart"}`}></i>
      </button>
      <Link to={`/product/${product.slug}`} className='text-decoration-none text-reset row'>
        <div className="col-2 p-3">
          <div className="ratio ratio-1x1">
            <div className="d-flex align-items-center justify-content-center">
              <img className="w-100 h-100 object-fit-contain" src={`http://localhost:3000/images/products/${product.img_url}`} alt={`${product.name}'s picture`} />
            </div>
          </div>
        </div>
        <div className="col-5 opacity-75">
          <div>{product.category}</div>
          <div>{product.animal_name}</div>
        </div>
        <div className="col-5">
          <h3 className="card-title">{product.name}</h3>
          <div className=" fs-4">&euro; {product.price}</div>
        </div>
        <div>
          <button
            onClick={addToCart}
            className="btn btn-dark btn-sm px-3 rounded-pill">
            Aggiungi al carrello
          </button>
        </div>
      </Link>
    </div >
  );
}
