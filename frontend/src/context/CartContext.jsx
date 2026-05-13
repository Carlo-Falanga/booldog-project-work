import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartContextProvider({ children }) {

  // aside cart
  const [asideCart, setAsideCart] = useState(false);

  // cart
  const cartArr = [];

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart_data");
    return saved ? JSON.parse(saved) : cartArr;
  });


  useEffect(() => {
    localStorage.setItem("cart_data", JSON.stringify(cart));
    /* localStorage.clear()  */
  }, [cart]);


  const [productQuantity, setProductQuantity] = useState(1);

  // aumento quantità da aggiungere al carrello con stock come massimale
  const increaseQuantity = () => {
    if (productQuantity < dataProduct?.stock) {
      setProductQuantity(productQuantity + 1);
    }
  };

  // diminuisco quantità da aggiungere al carrello se maggiore di 1
  const decreaseQuantity = () => {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
    }
  };


  // funzione aggiungi al carrello
  const addToCart = (item, quantity) => {
    // verifico se il prodotto esiste nel carrello
    const existingProduct = cart.find((product) => product.id === item.id);

    // se esiste aggiorno la quantità del prodotto esistente
    if (existingProduct) {
      const updatedCart = cart.map((product) =>
        product.id === item.id
          ? { ...product, quantity: product.quantity + quantity }
          : product,
      );
      setCart(updatedCart);
      // se non esiste aggiungo nuovo prodotto con quantità 1
    } else {
      setCart([...cart, { ...item, quantity: quantity }]);
    }

    setAsideCart(true);
    setProductQuantity(1);
  };



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
    <CartContext.Provider value={{
      cart,
      setCart,
      total,
      updateQuantity,
      removeFromCart,
      asideCart,
      setAsideCart,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      productQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(CartContext);

  return context;
}

//
