import { useGlobal } from "../context/CartContext";
import {Link} from "react-router-dom";


export default function CartProductsList() {
  const { cart, setCart, total, updateQuantity, removeFromCart } = useGlobal();
    


  return (
    
      <ul className="list-group">
        {cart.map((item) => (
          <li
            key={item.slug}
            className="list-group-item d-flex align-items-center gap-3"
          >
            <img
              src={`http://localhost:3000/images/products/${item.img_url}`}
              alt={item.name}
              className="rounded border cart_images"
            />

            <div className="flex-grow-1">
              <Link to={`/product/${item.slug}`}>
                <h5 className="mb-1">{item.name}</h5>
              </Link>
              <p className="mb-0 text-muted">Prezzo: € {item.price}</p>
            </div>

            <div className="d-flex align-items-center gap-2">
              {/* Bottone decremento quantita' */}
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => updateQuantity(item.slug, -1)}
              >
                −
              </button>
              <span className="badge bg-secondary">{item.quantity}</span>
              {/* Bottone incremento quantita' */}
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => updateQuantity(item.slug, +1)}
              >
                +
              </button>
              <button className="btn" onClick={() => removeFromCart(item.slug)}>
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    
  );
}
