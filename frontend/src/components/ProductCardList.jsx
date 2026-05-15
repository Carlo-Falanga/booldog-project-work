import { Link, useParams } from "react-router-dom";
import WishListButton from "./WishListButton";

export default function ProductCardList({ product, addToCart }) {

  return (

    <div className="card p-3 h-100 position-relative">
      <div className='text-decoration-none text-reset row'>

        <div className="col-2">

          <WishListButton product={product} slug={product.slug} />

          <Link to={`/product/${product.slug}`}>
            <div className="ratio ratio-1x1">
              <div className="d-flex align-items-center justify-content-center">
                <img className="w-100 h-100 object-fit-contain" src={`http://localhost:3000/images/products/${product.img_url}`} alt={`${product.name}'s picture`} />
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
