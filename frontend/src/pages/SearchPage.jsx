import axios from 'axios';
import { useEffect, useState } from 'react';

export default function SearchPage() {

    const [allProducts, setAllProducts] = useState([]);
    const [productList, setProductList] = useState([]);
    const [search, setSearch] = useState("");

    const url = `http://localhost:3000/products`

    //chiamata api per index dei prodotti
    useEffect(() => {
        axios.get(url)
            .then(res => {
                setAllProducts(res.data);
                setProductList(res.data);
            })
    }, [])

    //filtro i prodotti secondo quelli digitati nella barra di ricerca
    function handleSearch(query) {
        setSearch(query);
        const newList = allProducts.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
        setProductList(newList);
    }



    return (
        <>
            <h1 className='text-center my-3'>Ricerca prodotti</h1>
            <div className='container d-flex align-items-center justify-content-between mb-3'>
                {/* searchbar */}
                <input type="text" className='form-control d-inline w-25' placeholder='Ricerca un prodotto...  ' value={search} onChange={(e) => handleSearch(e.target.value)} />
                {/* filters */}
                <select name="" id="">Ordina i contenuti</select>
            </div>
            <div className="container">
                {productList.length > 0 ?
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
                    :
                    <h2 className=' position-absolute top-50 start-50 translate-middle'>Nessun prodotto trovato</h2>
                }
            </div>
        </>
    )
}




// Missione attuale: 
// implementeare le diverse opzioni di ordinamento


// Missioni future:
// implementare i filtri per categoria e per tipo di animale (o decidere di farle come pagine separate)
// fittare il design della pagina con quello del progetto
// aggiungere hover e altri effetti
