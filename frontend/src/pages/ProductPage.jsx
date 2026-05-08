import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios";

export default function ProductPage() {

    const [dataProduct, setDataProduct] = useState(null)

    const [cart, setCart] = useState([])

    const { slug } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${slug}`)
            .then(res => setDataProduct(res.data))

    }, [slug])

    const btnAddCart = (e) => {

        setCart([...cart, dataProduct.id])
    }


    console.log(cart)


    return (
        <div className="container">
            {dataProduct && (

                <div>
                    <h1>{dataProduct.name}</h1>
                    <p>{dataProduct.description}</p>
                    <p>{dataProduct.price}</p>
                    <p>{dataProduct.stock}</p>
                    <img src={dataProduct.img_url} alt={dataProduct.name} />
                    <div>
                        <button onClick={btnAddCart} className="btn btn-primary">Add cart</button>
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