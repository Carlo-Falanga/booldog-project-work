import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


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
        <>
            {dataProduct && (

                <div>
                    <h1>{dataProduct.name}</h1>
                    <p>{dataProduct.description}</p>
                    <p>{dataProduct.price}</p>
                    <p>{dataProduct.stock}</p>
                    <img src={dataProduct.image_url} alt={dataProduct.name} />
                </div>
            )
            }
        </>
    )
}