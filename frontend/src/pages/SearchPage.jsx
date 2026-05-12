import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductCardList from '../components/ProductCardList';

export default function SearchPage() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("");
    const [listView, setListView] = useState(true);


    const url = `http://localhost:3000/products`

    //chiamata api per index dei prodotti
    useEffect(() => {
        axios.get(`${url}?sort=${order}&search=${search}`)
            .then(res => {
                setProducts(res.data);
            })
    }, [order, search])


    function handleFilterChange(key, value) {
        //copio i parametri attuali dell'url
        const newParams = new URLSearchParams(searchParams);

        // modifico le variabili reattive 
        switch (key) {
            case 'sort':
                setOrder(value);
                break;
            case 'search':
                setSearch(value);
                break;
        }

        //modifico i parametri dell'url
        if (value) {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }

        setSearchParams(newParams);

    }




    return (
        <>
            <div className="container">
                <h1 className='text-center mt-5 mb-3'>Ricerca prodotti</h1>

                <div className="d-flex">
                    <button onClick={() => setListView(false)}>List</button>
                    <button onClick={() => setListView(true)}>grid</button>
                </div>

                <div className='d-flex align-items-center justify-content-between mb-3'>
                    {/* searchbar */}
                    <input type="text" className='form-control d-inline w-25' placeholder='Ricerca un prodotto...  ' value={search} onChange={(e) => handleFilterChange('search', e.target.value)} />
                    {/* filters */}
                    <div className='d-flex gap-3 align-items-baseline'>
                        <label htmlFor="product-order" className=' form-label flex-shrink-0'>Ordina i prodotti per</label>
                        <select name="product-order" id="product-order" className='form-select w-100' onChange={(e) => handleFilterChange('sort', e.target.value)}>
                            <option value="">Recenti</option>
                            <option value="name">Nome</option>
                            <option value="price-up">Prezzo crescente</option>
                            <option value="price-down">Prezzo decrescente</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="container">
                {products.length > 0 ?
                    <div className="row g-4 g-lg-3">
                        {/* {products.map(product => (
                            <div className="col" key={product.slug}>

                                <ProductCard product={product} />

                            </div>


                        ))} */}


                        {products.map((product) => (
                            listView ?
                                (
                                    <div key={product.slug} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                        <ProductCard product={product} addToCart={() => addToCart(product, 1)} />
                                    </div>
                                )
                                :
                                (
                                    <div key={product.slug} className="col-12">
                                        <ProductCardList product={product} addToCart={() => addToCart(product, 1)} />
                                    </div>
                                )
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


// Missioni future:
// implementare la doppia visualizzazione (lista e griglia)
// creare pagina gatto e pagina cane
// implementare i filtri per categoria e per tipo di animale, magari anche brand (EXTRA)
// aggiungere nella home page i link alle pagine per tipo di animale e per categoria (sentirsi con nabil)
// fittare il design della pagina con quello del progetto
// aggiungere hover e altri effetti (design finale della pagina alla fine -giustamente-)
