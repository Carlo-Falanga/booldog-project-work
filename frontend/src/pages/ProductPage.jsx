import { createContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios";
import { useGlobal } from "../context/CartContext"
import SideCart from "../components/SideCart";

export default function ProductPage() {

    const { cart, setCart } = useGlobal()

    const [dataProduct, setDataProduct] = useState(null)

    const [asideCart, setAsideCart] = useState(false)

    const [productQuantity, setProductQuantity] = useState(1)

    const { slug } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${slug}`)
            .then(res => setDataProduct(res.data))

    }, [slug])


    // funzione aggiungi al carrello
    // const addToCart = () => {

    //     // verifico se il prodotto esiste nel carrello
    //     const existingProduct = cart.find(
    //         item => item.id === dataProduct.id
    //     );

    //     // se esiste aggiorno la quantità del prodotto esistente
    //     if (existingProduct) {
    //         const updatedCart = cart.map(
    //             item => item.id === dataProduct.id ? { ...item, quantity: item.quantity + 1 } : item
    //         );
    //         setCart(updatedCart);
    //         // se non esiste aggiungo nuovo prodotto con quantità 1
    //     } else {
    //         setCart([...cart, { ...dataProduct, quantity: 1, },]);
    //     }
    // };

    const addToCart = () => {

        // verifico se il prodotto esiste nel carrello
        const existingProduct = cart.find(
            item => item.id === dataProduct.id
        );

        // se esiste aggiorno la quantità del prodotto esistente
        if (existingProduct) {
            const updatedCart = cart.map(
                item => item.id === dataProduct.id ? { ...item, quantity: item.quantity + productQuantity } : item
            );
            setCart(updatedCart);
            // se non esiste aggiungo nuovo prodotto con quantità 1
        } else {
            setCart([...cart, { ...dataProduct, quantity: productQuantity, },]);
        }

        setAsideCart(true)

    };


    // aumento quantità da aggiungere al carrello con stock come massimale
    // come massimale andrà inserito stock meno quantità già nel carrello
    const increaseQuantity = () => {
        if (productQuantity < dataProduct?.stock) {
            setProductQuantity(productQuantity + 1)
        }
    }

    // diminuisco quantità da aggiungere al carrello se maggiore di 1
    const decreaseQuantity = () => {
        if (productQuantity > 1) {
            setProductQuantity(productQuantity - 1)
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
                                    <button onClick={decreaseQuantity}>-</button>
                                    <div>{productQuantity}</div>
                                    <button onClick={increaseQuantity}>+</button>
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
                                    <div key={product.slug}>
                                        <Link to={`/product/${product.slug}`} className="text-decoration-none">
                                            <div className="ratio ratio-1x1 bg-white mb-3">
                                                <div className="d-flex align-items-center justify-content-center p-3">
                                                    <img className="img-fluid" src={`http://localhost:3000/images/products/${product.img_url}`} alt={product.name} />
                                                </div>
                                            </div>
                                            <h3 className="h5">{product.name}</h3>
                                            <p>{product.price} €</p>
                                        </Link>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            )}

            {asideCart && (
                <SideCart setAsideCart={setAsideCart} />
            )}
        </div>
    )
}