import axios from 'axios';
import { useEffect, useState } from 'react';

export default function SearchPage() {

    const [productList, setProductList] = useState([]);

    const url = `http://localhost:3000/products`

    useEffect(() => {
        axios.get(url)
            .then(res => {
                setProductList(res.data);
            })
    }, [])


    return (
        <>
            <h1 className='text-center mt-3'>Ricerca prodotti</h1>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    {productList.map(product => (
                        <div className="col" key={product.id}>
                            <div className="card">
                                {product.name}
                                {product.price}
                                {product.category}
                                {product.img_url}
                                {product.brand_name}
                                {product.animal_name}
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}




// Missione attuale: 
// abbellire la pagina e le card, inserendoci tutte le informazioni del caso