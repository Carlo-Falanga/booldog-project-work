import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useGlobal } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import ProductCardList from '../components/ProductCardList';
import SearchBar from '../components/SearchBar';
import OrderSelect from '../components/OrderSelect';
import VisualizationButton from '../components/VisualizationButton';
import SideCart from '../components/SideCart';

export default function SearchPage() {

    const { animalSlug } = useParams();

    const endpoint = animalSlug ? `animal/${animalSlug}` : "";

    const [searchParams, setSearchParams] = useSearchParams();

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState(searchParams.get('search') || "");
    const [order, setOrder] = useState(searchParams.get('sort') || "");
    const [listView, setListView] = useState(false);

    const url = `http://localhost:3000/products/${endpoint}`

    //chiamata api per index dei prodotti
    useEffect(() => {
        axios.get(`${url}?sort=${order}&search=${search}`)
            .then(res => {
                setProducts(res.data);
            })
    }, [order, search, endpoint])


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



    const { asideCart, setAsideCart, addToCart } = useGlobal();

    return (
        <>
            <div className="container">
                <h1 className='text-center mt-5 mb-3'>Ricerca prodotti</h1>

                <VisualizationButton setListView={setListView} />

                <div className='d-flex align-items-center justify-content-between mb-3'>
                    {/* searchbar */}
                    <SearchBar search={search} handleFilterChange={handleFilterChange} />
                    {/* filters */}
                    <OrderSelect handleFilterChange={handleFilterChange} />
                </div>
            </div>
            <div className="container">
                {products.length > 0 ?
                    <div className="row g-4 g-lg-3">

                        {products.map((product) => (
                            listView ?
                                (
                                    <div key={product.slug} className="col-12">
                                        <ProductCardList product={product} addToCart={() => addToCart(product, 1)} />
                                    </div>
                                )
                                :
                                (
                                    <div key={product.slug} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                        <ProductCard product={product} addToCart={() => addToCart(product, 1)} />
                                    </div>
                                )
                        ))}
                    </div>
                    :
                    <h2 className=' position-absolute top-50 start-50 translate-middle'>Nessun prodotto trovato</h2>
                }

                {asideCart && <SideCart setAsideCart={setAsideCart} />}

            </div>
        </>
    )
}



