import {
  Link,
  NavLink,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import CartPage from "../pages/CartPage";
import { useGlobal } from "../context/CartContext";
import booldog_logo from "../assets/logo/Booldog_logo.png";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { cart, setAsideCart } = useGlobal();

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  // gestisce la ricerca tramite searchbar
  function handleSubmit(e) {
    e.preventDefault();
    if (search.trim() === "") return;

    const newParams = new URLSearchParams(searchParams);

    newParams.set("search", search);

    let targetPath = location.pathname;
    if (targetPath !== "/products/animal/cane" && targetPath !== "/products/animal/gatto" && targetPath !== "/products") {
      targetPath = "/products";
    }

    navigate(`${targetPath}?${newParams.toString()}`);
  }

  return (
    <section className="navbar_custom_bg position-sticky top-0 z-2 px-4 py-2">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg position-relative d-flex align-items-center ">
          <Link
            to="/"
            className="navbar-brand m-0 d-lg-none"
          >
            <img
              src={booldog_logo}
              alt="Booldog Logo"
              style={{ height: "50px", width: "auto", objectFit: "contain" }}
            />
          </Link>

          <Link
            to="/"
            className="navbar-brand position-absolute start-50 translate-middle-x m-0 d-none d-lg-block"
            style={{ zIndex: 2 }}
          >
            <img
              src={booldog_logo}
              alt="Booldog Logo"
              style={{ height: "50px", width: "auto", objectFit: "contain" }}
            />
          </Link>

          <button
            className="navbar-toggler ms-auto order-lg-1 border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="d-none d-lg-flex align-items-center ms-auto order-lg-3">

            <div onClick={() => setAsideCart(true)} role="button" className="navbar_icons_hover position-relative mx-2">
              <i className="bi bi-cart2 text-black d-flex"></i>
              <span className="cart_badge position-absolute top-0 start-100 translate-middle rounded-circle d-block aspect-ratio-1x1 text-white text-center">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </div>

            <Link to="/wishlist" className="navbar_icons_hover text-decoration-none mx-2">
              <i className="bi bi-heart text-black d-flex"></i>
            </Link>

            <form onSubmit={handleSubmit} className="d-flex align-items-center mx-2">
              <input
                type="text"
                className="form-control me-2 rounded-pill border-0"
                placeholder="Ricerca..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "220px" }}
              />

              <button className="btn btn-dark btn_cart border-0 p-2 rounded-circle aspect-ratio-1x1">
                <i className="bi bi-search text-white d-flex"></i>
              </button>
            </form>
          </div>

          <div className="collapse navbar-collapse order-lg-2 mt-3 mt-lg-0 navbar_mobile_menu" id="navbarNav">
            <ul className="navbar-nav me-auto mb-0 text-center text-lg-start w-100 d-flex align-items-center">
              <li className="nav-item p-2">
                <NavLink to="/products/animal/cane" className="nav-link">
                  Cane
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink to="/products/animal/gatto" className="nav-link">
                  Gatto
                </NavLink>
              </li>
              <li className="nav-item ps-2">
                <NavLink to="/products" className="nav-link" end>
                  Catalogo completo
                </NavLink>
              </li>
            </ul>

            <div className="d-flex d-lg-none flex-column gap-4 mt-4 pb-3">
              <form onSubmit={handleSubmit} className="d-flex w-100">
                <input
                  type="text"
                  className="form-control rounded-pill me-2"
                  placeholder="Ricerca un prodotto..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-dark btn_cart rounded-circle border-0 flex-shrink-0"
                  aria-label="Cerca"
                >
                  <i className="bi bi-search text-white"></i>
                </button>
              </form>

              <div className="d-flex align-items-start justify-content-center gap-5">
                <Link
                  to="/cart"
                  className="text-decoration-none text-black"
                >

                  <div className="navbar_icons_hover position-relative mx-2">
                    <i className="bi bi-cart2 text-black d-flex"></i>
                    <span className="cart_badge position-absolute top-0 start-100 translate-middle rounded-circle d-block aspect-ratio-1x1 text-white text-center">
                      {cart.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  </div>

                </Link>

                <Link to="/wishlist" className="navbar_icons_hover text-decoration-none mx-2">
                  <i className="bi bi-heart text-black d-flex"></i>
                </Link>




              </div>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}
