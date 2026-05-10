import { NavLink } from "react-router-dom"
import CartPage from "../pages/CartPage"
import axios from "axios"

export default function AppHeader() {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <a className="navbar-brand fw-bold fs-4" href="#">
          🐾 BoolDog
        </a>

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
              <a className="nav-link active" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Cani</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Gatti</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Offerte</a>
            </li>
          </ul>

          <div className="d-flex gap-2 align-items-center">
            <span className="text-white position-relative" style={{ cursor: 'pointer', fontSize: '1.3rem' }}>
              🛒
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                0
              </span>
            </span>
            <button className="btn btn-outline-light btn-sm">Accedi</button>
            <button className="btn btn-warning btn-sm fw-semibold">Registrati</button>
          </div>
        </div>
      </nav>

        </>
    )
}