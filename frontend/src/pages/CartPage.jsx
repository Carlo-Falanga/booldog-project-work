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
          <div className="row row-cols-1 row-cols-md-2 g-5 ">
            <div className="col">
              <CartProductsList
                total={total}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
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

                  <CartTotal />
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
