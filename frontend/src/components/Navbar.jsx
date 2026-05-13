import { Link, NavLink } from "react-router-dom";
import CartPage from "../pages/CartPage";
import { useGlobal } from "../context/CartContext";

export default function Navbar() {

  const { cart } = useGlobal();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link to="/" className="navbar-brand fw-bold fs-4" href="#">
        🐾 BoolDog
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink to="/" className="nav-link " href="#">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/products/cane" className="nav-link " href="#">
              Cani
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/products/gatto" className="nav-link " href="#">
              Gatti
            </NavLink>
          </li>
        </ul>

        <div className="d-flex gap-2 align-items-center justify-content-around">
          <Link to="/cart" className="btn text-white">
            <span>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
            <i className="bi bi-cart"></i>
          </Link>
          {/* Wish list button */}
          <Link to="/wishlist" className="btn text-white">
            <i className="bi bi-heart"></i>
          </Link>
          <Link to="/products" className="btn text-white">
            <i className="bi bi-search"></i>
          </Link>
        </div>
      </div>
    </nav>
  )
}