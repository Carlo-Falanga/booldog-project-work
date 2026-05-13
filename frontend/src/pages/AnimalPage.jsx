import { Link, useParams } from 'react-router-dom';
import { useSearchFilters } from '../hooks/useSearchFilters';
import { useGlobal } from "../context/CartContext";
import ProductCard from '../components/ProductCard';
import ProductCardList from '../components/ProductCardList';
import SearchBar from '../components/SearchBar';
import OrderSelect from '../components/OrderSelect';
import VisualizationButton from '../components/VisualizationButton';
import SideCart from '../components/SideCart';

export default function AnimalPage() {

    const { asideCart, setAsideCart, addToCart } = useGlobal();

    const { animalSlug } = useParams();

    const { products, search, order, handleFilterChange, listView, setListView } = useSearchFilters(`animal/${animalSlug}`);

    return (
        <section>
            <div className="container">
                {animalSlug === "gatto" ?
                    <h1 className='text-center mt-5 mb-3'>
                        Prodotti per gatti
                    </h1>
                    :
                    <h1 className='text-center mt-5 mb-3'>
                        Prodotti per cani
                    </h1>
                }

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



            </div>
            {asideCart && <SideCart setAsideCart={setAsideCart} />}
        </section>
    )
}



// missione attuale:
// implementare visualizzazione a griglia e a lista come nella searchpage