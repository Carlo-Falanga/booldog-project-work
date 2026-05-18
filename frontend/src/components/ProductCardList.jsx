import { Link, useParams } from "react-router-dom";
import WishListButton from "./WishListButton";

export default function ProductCardList({ product, addToCart, animalType }) {

  return (

    <div className="border rounded-3 overflow-hidden">
      <div className="d-flex">

        <div className="col-4 col-lg-3 position-relative">
          <WishListButton product={product} slug={product.slug} />
          <Link to={`/product/${product.slug}`} className="aspect-ratio-1x1 d-flex align-items-center justify-content-center">
            <img className="w-100 h-100 object-fit-contain p-3" src={`http://localhost:3000/images/products/${product.img_url}`} alt={`${product.name}'s picture`} />
          </Link>
        </div>

        <div className="col-8 col-lg-9 p-3 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <div className="cart-meta mb-2">{animalType ? '' : `${product.animal_name} / `}{product.category}</div>
            <h3 className="cart-name h4 mb-2">{product.name}</h3>
            <div className="cart-name h5">&euro; {product.price}</div>
            {product.stock === 0 ?
              <div>Esaurito</div>
              :
              <button
                onClick={addToCart}
                disabled={product.stock === 0}
                className="btn bg-black p-2 border-0 rounded-pill text-white">
                <i class="d-flex p-1 bi bi-cart2"></i>
              </button>
            }
          </div>
        </div>

      </div>
    </div >
  );
}
