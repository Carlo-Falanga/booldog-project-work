import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function SearchPage() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("");

    const url = `http://localhost:3000/products`

    //chiamata api per index dei prodotti
    useEffect(() => {
        axios.get(`${url}?sort=${order}`)
            .then(res => {
                setProducts(res.data);
            })
    }, [order])

    //calcolo l'array di prodotti finali, filtrando per ricerca ed ordinando i risultati
    const finalProducts = useMemo(() => {
        return products
            .filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
    }, [products, search])

    function handleOrderSelect(option) {
        setOrder(option);
        setSearchParams({ sort: option });
    }




    return (
        <>
            <div className="container">
                <h1 className='text-center mt-5 mb-3'>Ricerca prodotti</h1>

                <div className='d-flex align-items-center justify-content-between mb-3'>
                    {/* searchbar */}
                    <input type="text" className='form-control d-inline w-25' placeholder='Ricerca un prodotto...  ' value={search} onChange={(e) => setSearch(e.target.value)} />
                    {/* filters */}
                    <div className='d-flex gap-3 align-items-baseline'>
                        <label htmlFor="product-order" className=' form-label flex-shrink-0'>Ordina i prodotti per</label>
                        <select name="product-order" id="product-order" className='form-select w-100' onChange={(e) => handleOrderSelect(e.target.value)}>
                            <option value="">Recenti</option>
                            <option value="name">Nome</option>
                            <option value="price-up">Prezzo crescente</option>
                            <option value="price-down">Prezzo decrescente</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="container">
                {finalProducts.length > 0 ?
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 g-lg-3">
                        {finalProducts.map(product => (
                            <div className="col" key={product.slug}>
                                
                                    <ProductCard product={product} />
                                
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
// spostare anche la search lato backend


// Missioni future:
// implementare la doppia visualizzazione (lista e griglia)
// creare pagina gatto e pagina cane
// implementare i filtri per categoria e per tipo di animale, magari anche brand (EXTRA)
// aggiungere nella home page i link alle pagine per tipo di animale e per categoria (sentirsi con nabil)
// fittare il design della pagina con quello del progetto
// aggiungere hover e altri effetti (design finale della pagina alla fine -giustamente-)
