import { createContext, useContext, useState, useEffect } from "react";

const WishListContext = createContext();

export function WishListContextProvider({ children }) {

  const wishlistArr = [];

  const test = 'ciao'

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wish_data");
    return saved ? JSON.parse(saved) : wishlistArr;
  });

  useEffect(() => {
    localStorage.setItem("wish_data", JSON.stringify(wishlist));
    /* localStorage.clear()  */
  }, [wishlist]);


  // Rimuove il prodotto dal carrello
  const removeFromWishlist = (slug) => {
    const updated = wishlist.filter((item) => item.slug !== slug);
    setWishlist(updated);
    localStorage.setItem("wish_data", JSON.stringify(updated));
  };

  return (
    <WishListContext.Provider value={{ test }}>
      {children}
    </WishListContext.Provider>
  );

}

export function useWishlist() {

  const context = useContext(WishListContext);

  return context;
}

//
