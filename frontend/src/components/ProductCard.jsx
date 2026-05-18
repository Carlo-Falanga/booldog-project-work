import { Link, useParams } from "react-router-dom";
import WishListButton from "./WishListButton";

export default function ProductCard({ product, addToCart, animalType }) {

  return (

    <div className="border rounded-3 overflow-hidden h-100">
      <div className="d-flex flex-column h-100">

        <div className="col-auto position-relative">
          <WishListButton product={product} slug={product.slug} />
          <Link to={`/product/${product.slug}`} className="aspect-ratio-1x1 d-flex align-items-center justify-content-center">
            <img className="w-100 h-100 object-fit-contain p-3" src={`http://localhost:3000/images/products/${product.img_url}`} alt={`${product.name}'s picture`} />
          </Link>
        </div>

        <div className="col px-3">
          <div className="cart-meta mb-2">{animalType ? '' : `${product.animal_name} / `}{product.category}</div>
          <h3 className="cart-name h5 mb-3">{product.name}</h3>
        </div>

        <div className="px-3 col-auto">
          <div className="border-top py-3 d-flex align-items-center justify-content-between">
            <div className="font-newsreader h3 mb-0 lh-1 fw-light">
              {product.price} €
            </div>
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
    </div>
  );
}
