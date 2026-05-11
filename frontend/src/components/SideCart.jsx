import { useGlobal } from "../context/CartContext";
import { Link } from "react-router-dom";
import CartProductsList from "./CartProductsList";

export default function SideCart() {


  return (
    <div className="position-fixed top-0 end-0 h-100 bg-white shadow-lg p-3 w-50">
      <div className="mb-5">
        <h3 className="h5">Aggiunto al carrello</h3>
        <CartProductsList/>
        <Link to="/cart" className="btn btn-primary">
          Vai al carrello
        </Link>
      </div>
      <button onClick={() => setAsideCart(false)}>Chiudi</button>
    </div>
  );
}
