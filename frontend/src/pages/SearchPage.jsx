import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGlobal } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import ProductCardList from '../components/ProductCardList';
import Loader from '../components/Loader';

export default function SearchPage() {

    const { animalSlug } = useParams();
    const endpoint = animalSlug ?? '';

    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('search') || '';
    const order = searchParams.get('sort') || '';

    const [products, setProducts] = useState([]);
    const [listView, setListView] = useState(false);

    const url = animalSlug
        ? `http://localhost:3000/products/${endpoint}`
        : `http://localhost:3000/products`;

    useEffect(() => {
        setProducts([]);
        axios.get(`${url}?sort=${order}&search=${search}`)
            .then(res => setProducts(res.data));
    }, [order, search, endpoint]);

    function handleFilterChange(key, value) {
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set(key, value);
        }
        else {
            newParams.delete(key);
        }
        setSearchParams(newParams);
    }

    const { addToCart } = useGlobal();

    const sortOptions = [
        { value: '', label: 'Novità' },
        { value: 'price-up', label: 'Prezzo ↑' },
        { value: 'price-down', label: 'Prezzo ↓' },
        { value: 'name', label: 'Nome' },
    ];

    const pageTitle = animalSlug
        ? animalSlug.charAt(0).toUpperCase() + animalSlug.slice(1)
        : 'Catalogo';

    return (
        <>

            {/* ══════════════════════════════════════
                TESTATA EDITORIALE
            ══════════════════════════════════════ */}
            <section className="border-bottom px-3 px-md-5 pt-5 pb-4 bg-paper">
                <div className="container-xxl">

                    {/* breadcrumb */}
                    <nav className="d-flex align-items-center gap-2 mb-4 eyebrow">
                        <span>Booldog</span>
                        <span className="text-secondary">/</span>
                        <span>{pageTitle}</span>
                        <span className="flex-grow-1 border-top d-none d-sm-block mx-2" style={{ maxWidth: 320 }} />
                        <span className="text-muted">{products.length} articoli</span>
                    </nav>

                    {/* heading + lede + stats */}
                    <div className="row align-items-end g-4 g-lg-5">

                        <div className="col-12 col-lg-7">
                            <h1 className="sp-hero-title mb-0">
                                {animalSlug
                                    ? <>{pageTitle}<br /><em>selezionato.</em></>
                                    : <>Tutto il<br /><em>catalogo.</em></>}
                            </h1>
                        </div>

                        <div className="col-12 col-lg-5">
                            <p className="sp-lede mb-4">
                                {animalSlug
                                    ? `Prodotti pensati per il tuo ${pageTitle.toLowerCase()}. Marchi europei, spediti da Milano in 24/48h.`
                                    : "Ogni articolo su Booldog, in un'unica vista. Marchi europei, cibo, accessori e cucce."}
                            </p>

                            {/* stats */}
                            <div className="row g-0 border-top pt-3">
                                {[
                                    { num: products.length || '—', label: 'Articoli', sub: 'tutti in stock' },
                                    { num: '42', label: 'Marchi', sub: 'europei selezionati' },
                                    { num: '4.9', label: 'Stelle', sub: 'su 18k recensioni' },
                                ].map((s, i) => (
                                    <div
                                        key={i}
                                        className={`col-4 ${i < 2 ? 'border-end' : ''}`}
                                        style={{ paddingLeft: i > 0 ? '1rem' : 0, paddingRight: i < 2 ? '1rem' : 0 }}
                                    >
                                        <span className="sp-stats-num d-block">{s.num}</span>
                                        <strong className="d-block" style={{ fontSize: 13 }}>{s.label}</strong>
                                        <span className="text-muted" style={{ fontSize: 12 }}>{s.sub}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
                TOOLBAR + GRIGLIA
            ══════════════════════════════════════ */}
            <section className="px-3 px-md-5 py-4">
                <div className="container-xxl">

                    {/* toolbar */}
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 pb-3 border-bottom border-dark mb-4">

                        {/* sinistra: contatore + cancella ricerca */}
                        <div className="d-flex align-items-center gap-3">
                            <span className="eyebrow text-muted">
                                <span className="sp-toolbar-count">{products.length}</span>&nbsp;articoli
                            </span>
                            {search && (
                                <button
                                    className="btn btn-sm btn-outline-secondary rounded-pill d-inline-flex align-items-center gap-1"
                                    onClick={() => handleFilterChange('search', '')}
                                >
                                    <i className="bi bi-x-lg" style={{ fontSize: 10 }} />
                                    &ldquo;{search}&rdquo;
                                </button>
                            )}
                        </div>

                        {/* destra: sort + toggle vista */}
                        <div className="d-flex align-items-center gap-2">

                            {/* select ordina */}
                            <div className="sp-sort-wrap d-flex align-items-center gap-2 border rounded-pill px-3 py-1">
                                <span className="text-muted eyebrow">Ordina ·</span>
                                <select
                                    className="sp-select border-0 bg-transparent fw-medium"
                                    value={order}
                                    onChange={e => handleFilterChange('sort', e.target.value)}
                                    aria-label="Ordina per"
                                >
                                    {sortOptions.map(o => (
                                        <option key={o.value} value={o.value}>{o.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* toggle griglia / lista */}
                            <div className="sp-views d-flex gap-1 border rounded-pill p-1">
                                <button
                                    className={`sp-view-btn btn p-0${!listView ? ' active' : ''}`}
                                    onClick={() => setListView(false)}
                                    aria-label="Vista griglia"
                                    title="Griglia"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="1.6">
                                        <rect x="3" y="3" width="7" height="7" />
                                        <rect x="14" y="3" width="7" height="7" />
                                        <rect x="3" y="14" width="7" height="7" />
                                        <rect x="14" y="14" width="7" height="7" />
                                    </svg>
                                </button>
                                <button
                                    className={`sp-view-btn btn p-0${listView ? ' active' : ''}`}
                                    onClick={() => setListView(true)}
                                    aria-label="Vista lista"
                                    title="Lista"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                                        <line x1="3" y1="6" x2="21" y2="6" />
                                        <line x1="3" y1="12" x2="21" y2="12" />
                                        <line x1="3" y1="18" x2="21" y2="18" />
                                    </svg>
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* prodotti */}
                    {products.length > 0 ? (
                        <div className={`row ${listView ? 'g-0' : 'g-3 g-lg-4'}`}>
                            {products.map(product => (
                                listView ? (
                                    <div key={product.slug} className="col-12 border-bottom">
                                        <ProductCardList
                                            product={product}
                                            addToCart={() => addToCart(product, 1)}
                                        />
                                    </div>
                                ) : (
                                    <div key={product.slug} className="col-12 col-sm-6 col-md-4 col-xl-3">
                                        <ProductCard
                                            product={product}
                                            addToCart={() => addToCart(product, 1)}
                                        />
                                    </div>
                                )
                            ))}
                        </div>
                    ) : (
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '40vh' }}>
                            {search
                                ? <h2 className="text-center">Nessun prodotto trovato</h2>
                                : <Loader />}
                        </div>
                    )}

                </div>
            </section>

        </>
    );
}