import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("booldog_cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  

  return (
    <section className="py-5">
      <div className="container">
        <h1 className="mb-3">Carrello</h1>

        {cart.length === 0 ? (
          <div className="alert alert-info">Il carrello è vuoto</div>
        ) : (
          <div className="row">
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
                      style={{ width: 80, height: 80, objectFit: "cover" }}
                      className="rounded border"
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
              <h3>Riepilogo</h3>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
