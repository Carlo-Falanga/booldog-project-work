import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext()

export function CartContextProvider({ children }) {
    const cartArr = []

    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart_data");
        return saved ? JSON.parse(saved) : cartArr;
    });

    useEffect(() => {
        localStorage.setItem("cart_data", JSON.stringify(cart));
     /* localStorage.clear()  */
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    )
}

export function useGlobal() {
    const context = useContext(CartContext)

    return context
}

//