import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("booldog_cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  const total = cart.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0,
  );

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

                    <div className="text-end">
                      <span className="badge bg-secondary">
                        Qty: {item.quantity}
                      </span>
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
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
