import { useGlobal } from "../context/CartContext";
import { Link } from "react-router-dom";
import CartProductsList from "./CartProductsList";
import CartTotal from "./CartTotal";

export default function SideCart({ setAsideCart }) {
  return (
    <div className="position-fixed top-0 end-0 h-100 bg-white shadow-lg p-3 z-100 sidebar_width">
      <div className="mb-5">
        {/* X button for closing the cart */}
        <button
          className="btn-close d-flex ms-auto mb-3"
          aria-label="Close"
          onClick={() => setAsideCart(false)}
        ></button>
        <CartProductsList />

        <CartTotal />

        <Link
          to="/cart"
          className="d-flex justify-content-end text-decoration-none"
        >
          <button className="btn btn-dark btn-sm rounded-pill w-50 py-3 mt-4 border-0 btn_cart">
            Vai al carrello
          </button>
        </Link>
      </div>
    </div>
  );
}
