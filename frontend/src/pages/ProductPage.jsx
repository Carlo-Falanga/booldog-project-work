import { createContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios";
import { useGlobal } from "../context/CartContext"

export default function ProductPage() {

    const { cart, setCart } = useGlobal()

    const [dataProduct, setDataProduct] = useState(null)

    const { slug } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${slug}`)
            .then(res => setDataProduct(res.data))

    }, [slug])


    // funzione aggiungi al carrello
    const addToCart = () => {

        // verifico se il prodotto esiste nel carrello
        const existingProduct = cart.find(
            item => item.id === dataProduct.id
        );

        // se esiste aggiorno la quantità del prodotto esistente
        if (existingProduct) {
            const updatedCart = cart.map(
                item => item.id === dataProduct.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCart(updatedCart);
            // se non esiste aggiungo nuovo prodotto con quantità 1
        } else {
            setCart([...cart, { ...dataProduct, quantity: 1, },]);
        }
    };


    // cerco prodotto corrente all'interno del carrello
    const cartCurrentProduct = cart.find(
        item => item.id === dataProduct?.id
    );

    // funzione rimuovi dal carrello
    const removeToCart = () => {

        if (cartCurrentProduct.quantity > 0) {
            const updatedCart = cart.map(
                item => item.id === dataProduct.id ? { ...item, quantity: item.quantity - 1 } : item
            );
            setCart(updatedCart);
        }

    }




    return (
        <div className="container py-5">
            {dataProduct && (

                <div className="">
                    <div className="row row-cols-2">
                        <div className="">
                            <img className="img-fluid" src={`http://localhost:3000/images/products/${dataProduct.img_url}`} alt={dataProduct.name} />
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <div className="p-5 text-center">
                                <h1>{dataProduct.name}</h1>
                                <p>{dataProduct.description}</p>
                                <p>{dataProduct.price} €</p>
                                <div className="d-flex">
                                    <button onClick={addToCart}>+</button>
                                    {cartCurrentProduct ? cartCurrentProduct.quantity : 0}
                                    <button onClick={removeToCart}>-</button>
                                </div>
                                <button onClick={addToCart} className="btn btn-primary">Aggiungi al carrello</button>
                            </div>
                        </div>
                    </div>

                    <div className="py-5">
                        <h3>Related</h3>
                        <div className="row row-cols-4">
                            {
                                dataProduct.related.map(product =>
                                    <Link to={`/product/${product.slug}`} key={product.slug}>
                                        <h3 className="h5">{product.name}</h3>
                                        <p>{product.price}</p>
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    )
}