import { useEffect, useState } from "react";
import { useGlobal } from "../context/CartContext";
import { Link } from "react-router-dom";
import CartProductsList from "../components/CartProductsList";
import CartTotal from "../components/CartTotal";

export default function CartPage() {
  const { cart, setCart, total, updateQuantity, removeFromCart } = useGlobal();

  useEffect(() => {
    const saved = localStorage.getItem("cart_data");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  return (
    <section className="py-5">
      <div className="container">
        {/* Titolo carrello*/}
        <h1 className="cart-hero mt-3 mb-5">
          <span className="d-block">Il tuo</span>
          <em className="d-block">carrello.</em>
        </h1>

        {cart.length === 0 ? (
          <div className="alert alert-info">Il carrello è vuoto</div>
        ) : (
          <div className="row row-cols-1 row-cols-lg-2 g-5 ">
            <div className="col">
              <CartProductsList
                total={total}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            </div>
            <div className="col">
              <section className="p-4 p-md-5 rounded-3 border bg-paper">
                {/* Header */}
                <div className="d-flex align-items-baseline gap-3 pb-3 border-bottom mb-4">
                  <h2 className="mb-0">Riepilogo</h2>
                </div>

                {/* Righe dettaglio */}
                <ul className="list-unstyled mb-4">
                  <li className="d-flex justify-content-between mb-2">
                    <span>
                      Subtotale ({cart.reduce((s, i) => s + i.quantity, 0)}{" "}
                      articoli)
                    </span>
                    <span>€ {total.toFixed(2)}</span>
                  </li>
                  <li className="d-flex justify-content-between mb-2">
                    <span>Spedizione in tutta Europa</span>
                    <span className="cart-meta text-success">Gratuita</span>
                  </li>
                </ul>

                {/* Totale */}
                <div className="d-flex justify-content-between align-items-baseline pt-3 border-top">
                  <h3
                    className="cart-name mb-0"
                    
                  >
                    Totale
                  </h3>
                  <span
                    className="cart-name cart_total"
                  >
                    € {total.toFixed(2).split(".")[0]}
                    <span className=" ms-1 cart_cents">
                      ,{total.toFixed(2).split(".")[1]}
                    </span>
                  </span>
                </div>

                <p className="cart-meta mb-4 mt-1">
                  IVA inclusa ·Spedizione Gratuita
                </p>

                {/* Bottone checkout */}
                <Link
                  to="/checkout"
                  className="btn btn-dark btn-lg w-100 rounded-pill py-3 mb-4 d-flex align-items-center justify-content-center gap-2 border-0 btn_checkout"
                >
                  <span className="fs-6">Vai al checkout</span>
                  <i className="bi bi-arrow-right"></i>
                </Link>

                {/* Trust badges */}
                <ul className="list-unstyled mb-0">
                  <li className="d-flex gap-3 mb-3">
                    <i className="bi bi-envelope fs-5 text-dark"></i>
                    <div>
                      <div className="fw-medium">Mail di conferma</div>
                      <div className="small text-muted">
                         Riceverai una mail di conferma con i dettagli del tuo ordine
                      </div>
                    </div>
                  </li>
                  <li className="d-flex gap-3 mb-3">
                    <i className="bi bi-box-seam fs-5 text-dark"></i>
                    <div>
                      <div className="fw-medium">Spedito da Boolean Best Team</div>
                      <div className="small text-muted">
                        Corriere espresso · consegna 24/48h
                      </div>
                    </div>
                  </li>
                  <li className="d-flex gap-3">
                    <i className="bi bi-arrow-counterclockwise fs-5 text-dark"></i>
                    <div>
                      <div className="fw-medium">30 giorni per ripensarci</div>
                      <div className="small text-muted">
                        Resi gratuiti, ritiro a domicilio incluso
                      </div>
                    </div>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
