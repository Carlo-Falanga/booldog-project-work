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
          {cart.map((item) => {
            // se non conosco lo stock non blocco i bottoni
            const hasStock = typeof item.stock === "number";
            // disabilito "+" se ho già raggiunto il massimo disponibile
            const isPlusDisabled = hasStock && item.quantity >= item.stock;
            // disabilito "-" se sono già a 1 (non si può scendere sotto)
            const isMinusDisabled = item.quantity <= 1;

            return (
              <li
                key={item.slug}
                className="d-flex gap-4 py-4 border-bottom cart-item"
              >
                {/* Immagine */}
                <div className="cart-thumb position-relative flex-shrink-0 bg-white">
                  <img
                    src={`http://localhost:3000/images/products/${item.img_url}`}
                    alt={item.name}
                    className="w-100 h-100 object-fit-contain rounded-1"
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
                        Taglia{" "}
                        <strong className="text-dark">{item.size} </strong>
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
                    <div className="quantity-controls rounded-pill bg-paper border d-flex">
                      <button
                        type="button"
                        disabled={isMinusDisabled}
                        className="btn p-2 border-0"
                        onClick={() => updateQuantity(item.slug, -1)}
                      >
                        <i className="bi bi-dash d-flex"></i>
                      </button>
                      <div className="d-flex align-items-center justify-content-center">
                        <span className="small">{item.quantity}</span>
                      </div>
                      <button
                        type="button"
                        disabled={isPlusDisabled}
                        className="btn p-2 border-0"
                        onClick={() => updateQuantity(item.slug, +1)}
                      >
                        <i className="bi bi-plus d-flex"></i>
                      </button>
                    </div>

                    <button
                      type="button"
                      className="btn btn-link btn-sm p-0 text-decoration-none remove_product_list"
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
            );
          })}
        </ul>
      </section>
    </>
  );
}
