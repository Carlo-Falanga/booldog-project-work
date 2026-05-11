import { useGlobal } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartProductsList() {
  const { cart, setCart, total, updateQuantity, removeFromCart } = useGlobal();

  return (
    <>
      <section className="cart-items">
        {/* Header */}
        <div className="d-flex align-items-baseline justify-content-between pb-3 border-bottom mb-4">
          <div className="d-flex align-items-baseline gap-3">
            <h3 className="mb-0">Articoli</h3>
          </div>
          <span className="cart-meta">
            {cart.reduce((sum, i) => sum + i.quantity, 0)} · PEZZI
          </span>
        </div>

        {/* Lista */}
        <ul className="list-unstyled m-0">
          {cart.map((item) => (
            <li
              key={item.slug}
              className="d-flex gap-4 py-4 border-bottom cart-item"
            >
              {/* Immagine */}
              <div className="cart-thumb position-relative flex-shrink-0">
                <img
                  src={`http://localhost:3000/images/products/${item.img_url}`}
                  alt={item.name}
                  className="w-100 h-100 object-fit-cover rounded-1"
                />
              </div>

              {/* Info */}
              <div className="flex-grow-1 d-flex flex-column gap-2 min-w-0">
                <Link
                  to={`/product/${item.slug}`}
                  className="text-decoration-none text-reset"
                >
                  <h3 className="cart-name fs-4 mb-0">{item.name}</h3>
                </Link>

                <p className="text-muted small mb-0">
                  {item.size && (
                    <>
                      Taglia <strong className="text-dark">{item.size} </strong>
                    </>
                  )}
                  {item.color && (
                    <>
                      · Colore{" "}
                      <strong className="text-dark">{item.color}</strong>
                    </>
                  )}
                </p>

                {/* Controlli */}
                <div className="d-flex align-items-center gap-3 mt-2 flex-wrap">
                  <div className="btn-group" role="group" aria-label="Quantità">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm rounded-start-pill border-end-0 increse_decrease_btn"
                      onClick={() => updateQuantity(item.slug, -1)}
                    >
                      −
                    </button>
                    <span className="btn btn-outline-secondary btn-sm disabled px-3 border-start-0 border-end-0">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm rounded-end-pill border-start-0 increse_decrease_btn"
                      onClick={() => updateQuantity(item.slug, +1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="btn btn-link btn-sm text-muted p-0 text-decoration-none"
                    onClick={() => removeFromCart(item.slug)}
                  >
                    Rimuovi
                  </button>
                </div>
              </div>

              {/* Prezzo */}
              <div
                className="d-flex flex-column align-items-end text-end"
                style={{ minWidth: "110px" }}
              >
                <span className="cart-name fs-4">€ {item.price}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
