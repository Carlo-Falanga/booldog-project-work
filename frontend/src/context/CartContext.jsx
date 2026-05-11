import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartContextProvider({ children }) {
  const cartArr = [];

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart_data");
    return saved ? JSON.parse(saved) : cartArr;
  });

  useEffect(() => {
    localStorage.setItem("cart_data", JSON.stringify(cart));
    /* localStorage.clear()  */
  }, [cart]);

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
    const updated = cart.filter((item) => item.slug !== slug);
    setCart(updated);
    localStorage.setItem("cart_data", JSON.stringify(updated));
  };

  return (
    <CartContext.Provider value={{ cart, setCart, total, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(CartContext);

  return context;
}

//
