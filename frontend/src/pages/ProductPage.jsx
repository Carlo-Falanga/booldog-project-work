import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"


export default function ProductPage() {

    const [dataProduct, setDataProduct] = useState(null)

    const { slug } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/products/${slug}`)
            .then(res => res.json())
            .then(data => setDataProduct(data))
    }, [slug])

    console.log(dataProduct)


    return (
        <div className="container">
            {dataProduct && (

                <div>
                    <h1>{dataProduct.name}</h1>
                    <p>{dataProduct.description}</p>
                    <p>{dataProduct.price}</p>
                    <p>{dataProduct.stock}</p>
                    <img src={dataProduct.img_url} alt={dataProduct.name} />

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