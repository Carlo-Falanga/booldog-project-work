import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("booldog_cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  console.log("carrello:", cart);

  return (
    <section>
      <div className="container">
        <h1>Cart</h1>
        <p>Here you can view and manage your shopping cart.</p>

        {cart.length === 0 ? (
            <p>The cart is empty</p>
        ) :(
            <div>
                <p>Hai: {cart.length} prodotti nel carrello</p>
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>
                         
                            <p>Nome: {item.slug}</p>
                            <p>Quantità: {item.quantity}</p>
                        </li>
                    ))}
                </ul>
            </div>
        )
        }
      </div>
    </section>
  );
}
