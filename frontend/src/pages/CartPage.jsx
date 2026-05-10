import { useEffect, useState } from "react";
import { useGlobal } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, setCart } = useGlobal();

  useEffect(() => {
    const saved = localStorage.getItem("cart_data");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  // Calcolo del totale del carrello in base alla quantita'
  const total = cart.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0,
  );

  // Aggiorna la quantita' del prodotto
  const updateQuantity = (slug, amount) => {
    const updated = cart.map((item) => {
      const newQty = item.quantity + amount;
      if (item.slug === slug) {
        return { ...item, quantity: Math.max(1, Math.min(newQty, item.stock)) };
      }
      return item;
    });

    setCart(updated);
    localStorage.setItem("cart_data", JSON.stringify(updated));
  };

  // Rimuove il prodotto dal carrello
  const removeFromCart = (slug) => {
   const updated = cart.filter(item => item.slug !== slug);
     setCart(updated);
     localStorage.setItem("cart_data", JSON.stringify(updated));
 };
 

  return (
    <section className="py-5">
      <div className="container">
        <h1 className="mb-3">Carrello</h1>

        {cart.length === 0 ? (
          <div className="alert alert-info">Il carrello è vuoto</div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 g-5 ">
            <div className="col">
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
                      <h5 className="mb-1">{item.name}</h5>
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
                      <span className="badge bg-secondary">
                        {item.quantity}
                      </span>
                      {/* Bottone incremento quantita' */}
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQuantity(item.slug, +1)}
                      >
                        +
                      </button>
                      <button className="btn"  onClick={() => removeFromCart(item.slug)}>
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h4>Riepilogo</h4>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Articoli:</span>
                    <span>{cart.length}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span>Quantità totale:</span>
                    <span>
                      {cart.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between fs-5 fw-bold">
                    <span>Totale:</span>
                    <span>€ {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="text-end">
                <Link to="/checkout">
                  <button className="btn btn-primary">
                    Procedi al checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
