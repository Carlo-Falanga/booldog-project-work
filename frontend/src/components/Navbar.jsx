import { Link, NavLink } from "react-router-dom";
import CartPage from "../pages/CartPage";
import { useGlobal } from "../context/CartContext";
import booldog_logo from "../assets/logo/logo_booldog.jpg";

export default function Navbar() {

  const { cart } = useGlobal();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black px-4">

      <Link to="/" className=" d-flex align-items-center " href="#">
        <img className="logo" src={booldog_logo} alt="BoolDog logo" />
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
            <NavLink to="/" className="nav-link " >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/products/cane" className="nav-link " >
              Cani
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/products/gatto" className="nav-link " >
              Gatti
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/products" className="nav-link " end>
              Catalogo completo
            </NavLink>
          </li>
        </ul>

        <div className="d-flex gap-2 align-items-center justify-content-around">
          <Link to="/cart" className="btn text-white border border-0">
            <div className="navbar_icons_hover">
              <span>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
              <i className="bi bi-cart"></i>
            </div>
          </Link>
          {/* Wish list button */}
          <Link to="/wishlist" className="btn text-white border border-0">
            <div className="navbar_icons_hover">
              <i className="bi bi-heart"></i>
            </div>
          </Link>
          <Link to="/products" className="btn text-white border border-0">
            <div className="navbar_icons_hover">
              <i className="bi bi-search"></i>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  )
}