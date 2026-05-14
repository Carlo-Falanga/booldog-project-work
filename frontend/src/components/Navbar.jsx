import {
  Link,
  NavLink,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import CartPage from "../pages/CartPage";
import { useGlobal } from "../context/CartContext";
import booldog_logo from "../assets/logo/logo_booldog.jpg";
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
    if (targetPath === "/") {
      targetPath = "/products";
    }

    navigate(`${targetPath}?${newParams.toString()}`);
  }

  return (
    <section className="navbar_custom_bg position-sticky top-0 z-3 px-4 py-2">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg position-relative d-flex align-items-center ">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link
            to="/"
            className="navbar-brand position-absolute start-50 translate-middle-x"
            style={{ zIndex: 2 }}
          >
            <img
              src={booldog_logo}
              alt="Booldog Logo"
              style={{ height: "50px", width: "auto", objectFit: "contain" }}
            />
          </Link>

          <div className="d-none d-lg-flex align-items-center ms-auto order-3 gap-2">
            <div
              onClick={() => setAsideCart(true)}
              className="btn text-white border border-0"
            >
              <div className="navbar_icons_hover">
                <span className="text-black">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
                <i className="bi bi-cart text-black"></i>
              </div>
            </div>
            <Link to="/wishlist" className="btn text-white border border-0">
              <div className="navbar_icons_hover">
                <i className="bi bi-heart text-black"></i>
              </div>
            </Link>
            <form onSubmit={handleSubmit} className="d-flex align-items-center">
              <input
                type="text"
                className="form-control me-2 rounded-pill"
                placeholder="Ricerca..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "220px" }}
              />
              <button className="btn btn-dark rounded-circle btn_cart border-0">
                <i className="bi bi-search text-white"></i>
              </button>
            </form>
          </div>

          <div className="collapse navbar-collapse order-2" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/products/animal/cane" className="nav-link text-black">
                  Cane
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/products/animal/gatto" className="nav-link text-black">
                  Gatto
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/products" className="nav-link text-black" end>
                  Catalogo completo
                </NavLink>
              </li>
            </ul>

            <div className="d-flex d-lg-none align-items-center w-100 mt-2 gap-2">
              <div className="d-flex align-items-center gap-2">
                <Link to="/cart" className="btn text-white border border-0">
                  <div className="navbar_icons_hover">
                    <span>
                      {cart.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                    <i className="bi bi-cart"></i>
                  </div>
                </Link>
                <Link to="/wishlist" className="btn text-white border border-0">
                  <div className="navbar_icons_hover">
                    <i className="bi bi-heart"></i>
                  </div>
                </Link>
              </div>

              <form onSubmit={handleSubmit} className="d-flex w-100">
                <input
                  type="text"
                  className="form-control rounded-pill"
                  placeholder="Ricerca un prodotto..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-dark ms-2 rounded-circle">
                  <i className="bi bi-search text-white"></i>
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}
