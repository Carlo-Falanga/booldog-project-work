import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';

export default function SearchPage() {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("");

    const url = `http://localhost:3000/products`

    //chiamata api per index dei prodotti
    useEffect(() => {
        axios.get(url)
            .then(res => {
                setProducts(res.data);
            })
    }, [])

    //calcolo l'array di prodotti finali, filtrando per ricerca ed ordinando i risultati
    const finalProducts = useMemo(() => {
        return products
            .filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
            .toSorted((a, b) => {
                switch (order) {
                    case "price-up":
                        return a.price - b.price;
                        break;
                    case "price-down":
                        return b.price - a.price;
                        break;
                    case "name":
                        return a.name.localeCompare(b.name);
                        break;
                    case "recent":
                        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
                        break;
                    default:
                        return 0;
                }
            })

    }, [products, search, order])






    return (
        <>
            <h1 className='text-center my-3'>Ricerca prodotti</h1>
            <div className='container d-flex align-items-center justify-content-between mb-3'>
                {/* searchbar */}
                <input type="text" className='form-control d-inline w-25' placeholder='Ricerca un prodotto...  ' value={search} onChange={(e) => setSearch(e.target.value)} />
                {/* filters */}
                <div className='d-flex gap-3 align-items-baseline'>
                    <label htmlFor="product-order" className=' form-label flex-shrink-0'>Ordina i prodotti per</label>
                    <select name="product-order" id="product-order" className='form-select w-100' onChange={(e) => setOrder(e.target.value)}>
                        <option value="recent">Recenti</option>
                        <option value="name">Nome</option>
                        <option value="price-up">Prezzo crescente</option>
                        <option value="price-down">Prezzo decrescente</option>
                    </select>
                </div>
            </div>
            <div className="container">
                {finalProducts.length > 0 ?
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 mb-3">
                        {finalProducts.map(product => (
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
// aggiungere link sul prodotto per la pagina prodotto (sentirsi con odon)
// aggiungere nella home page i link alle pagine per tipo di animale e per categoria (sentirsi con nabil)
// fittare il design della pagina con quello del progetto
// aggiungere hover e altri effetti
