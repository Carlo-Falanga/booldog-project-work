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
            <h1 className='text-center my-3'>Ricerca prodotti</h1>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                    {productList.map(product => (
                        <div className="col" key={product.id}>
                            <div className="card p-3 h-100">
                                <div className="card-img card-header p-3">
                                    <img src={`http://localhost:3000/images/products/${product.img_url}`} alt={`${product.name}'s picture`} />
                                </div>
                                <div className=' d-flex align-items-center justify-content-between opacity-75 px-3 pt-3' >
                                    <div>
                                        {product.category}
                                    </div>
                                    <div>
                                        {product.animal_name}
                                    </div>
                                </div>
                                <div className='card-body'>
                                    <h3 className='card-title'>
                                        {product.name}
                                    </h3>
                                    <div className=' fs-4'> &euro; {product.price}</div>
                                </div>

                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}




// Missione attuale: 
// implementare la barra di ricerca

// Missioni future:
// implementeare le diverse opzioni di ordinamento
// fittare il design della pagina con quello del progetto
