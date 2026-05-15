import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGlobal } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import ProductCardList from '../components/ProductCardList';
import Loader from '../components/Loader';

export default function SearchPage() {

    const { animalSlug } = useParams();
    const endpoint = animalSlug ? animalSlug : "";

    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('search') || "";
    const order = searchParams.get('sort') || "";

    const [products, setProducts] = useState([]);
    const [listView, setListView] = useState(false);
    const [filtersOpen, setFiltersOpen] = useState(false);   // drawer mobile filtri

    const url = animalSlug
        ? `http://localhost:3000/products/animal/${endpoint}`
        : `http://localhost:3000/products`;

    useEffect(() => {
        setProducts([]);
        axios.get(`${url}?sort=${order}&search=${search}`)
            .then(res => setProducts(res.data));
    }, [order, search, endpoint]);

    function handleFilterChange(key, value) {
        const newParams = new URLSearchParams(searchParams);
        if (value) { newParams.set(key, value); }
        else { newParams.delete(key); }
        setSearchParams(newParams);
    }

    const { addToCart } = useGlobal();

    /* ── Opzioni di ordinamento ── */
    const sortOptions = [
        { value: '', label: 'Più popolari' },
        { value: 'price_asc', label: 'Prezzo ↑' },
        { value: 'price_desc', 'label': 'Prezzo ↓' },
        { value: 'newest', label: 'Novità' },
    ];

    const currentSortLabel =
        sortOptions.find(o => o.value === order)?.label ?? 'Più popolari';

    /* ── Sezione testata ── */
    const pageTitle = animalSlug
        ? animalSlug.charAt(0).toUpperCase() + animalSlug.slice(1)
        : 'Catalogo';

    return (
        <>
            {/* ════════════════════════════════
                TESTATA EDITORIALE
            ════════════════════════════════ */}
            <section className="plp-head">
                {/* breadcrumb */}
                <div className="sp-crumb">
                    <span className="sp-crumb__item">Booldog</span>
                    <span className="sp-crumb__sep">/</span>
                    <span className="sp-crumb__item sp-crumb__item--active">{pageTitle}</span>
                    <span className="sp-crumb__rule" />
                    <span className="sp-crumb__count">{products.length} articoli</span>
                </div>

                {/* heading + stats */}
                <div className="sp-head-grid">
                    <h1 className="sp-hero-title">
                        {animalSlug
                            ? <>{pageTitle}<br /><em>selezionato.</em></>
                            : <>Tutto il<br /><em>catalogo.</em></>}
                    </h1>

                    <div>
                        <p className="sp-lede">
                            {animalSlug
                                ? `Prodotti pensati per il tuo ${pageTitle.toLowerCase()}. Marchi europei, spediti da Milano in 24/48h.`
                                : 'Ogni articolo disponibile su Booldog, in un\'unica vista. Marchi europei, cibo, accessori e cucce.'}
                        </p>
                        <div className="sp-stats">
                            <div>
                                <span className="sp-stats__num">{products.length || '—'}</span>
                                <strong>Articoli</strong>
                                tutti in stock
                            </div>
                            <div>
                                <span className="sp-stats__num">42</span>
                                <strong>Marchi</strong>
                                europei selezionati
                            </div>
                            <div>
                                <span className="sp-stats__num">4.9</span>
                                <strong>Stelle</strong>
                                su 18k recensioni
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════
                LAYOUT PRINCIPALE — sidebar + griglia
            ════════════════════════════════ */}
            <section className="sp-main">

                {/* ── Overlay mobile filtri ── */}
                {filtersOpen && (
                    <div
                        className="sp-filters-overlay"
                        onClick={() => setFiltersOpen(false)}
                    />
                )}

                <div className={`sp-layout`}>

                    {/* ══ SIDEBAR FILTRI ══ */}
                    <aside className={`sp-filters${filtersOpen ? ' sp-filters--open' : ''}`}>

                        {/* header filtri */}
                        <div className="sp-f-head">
                            <h2>Filtri</h2>
                            <span className="sp-f-head__count">{products.length} risultati</span>
                            {search && (
                                <button
                                    className="sp-f-head__clear"
                                    onClick={() => handleFilterChange('search', '')}
                                >
                                    Cancella
                                </button>
                            )}
                            {/* chiudi su mobile */}
                            <button
                                className="sp-filters-close d-md-none ms-auto"
                                aria-label="Chiudi filtri"
                                onClick={() => setFiltersOpen(false)}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                                    <path d="M18 6 6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* ── Categoria ── */}
                        <div className="sp-f-group">
                            <h3>
                                Categoria
                                <span className="sp-f-group__ct">3</span>
                            </h3>
                            {[
                                { slug: '', label: 'Tutti i prodotti' },
                                { slug: 'cane', label: 'Cane' },
                                { slug: 'gatto', 'label': 'Gatto' },
                            ].map(cat => (
                                <label key={cat.slug} className="sp-f-row">
                                    <input
                                        type="radio"
                                        name="animal"
                                        checked={endpoint === cat.slug}
                                        readOnly
                                    />
                                    <span className="sp-f-row__box">
                                        <svg width="10" height="10" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor"
                                            strokeWidth="3" strokeLinecap="round">
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                    </span>
                                    <span className="sp-f-row__lab">{cat.label}</span>
                                </label>
                            ))}
                        </div>

                        {/* ── Ordina (versione sidebar) ── */}
                        <div className="sp-f-group">
                            <h3>Ordina per</h3>
                            {sortOptions.map(opt => (
                                <label key={opt.value} className="sp-f-row">
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={order === opt.value}
                                        onChange={() => handleFilterChange('sort', opt.value)}
                                    />
                                    <span className="sp-f-row__box">
                                        <svg width="10" height="10" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor"
                                            strokeWidth="3" strokeLinecap="round">
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                    </span>
                                    <span className="sp-f-row__lab">{opt.label}</span>
                                </label>
                            ))}
                        </div>

                        {/* ── Prezzo ── */}
                        <div className="sp-f-group sp-f-price">
                            <h3>Prezzo</h3>
                            <div className="sp-price-bar">
                                <div className="sp-price-bar__track" />
                                <div className="sp-price-bar__fill" />
                                <div className="sp-price-bar__knob sp-price-bar__knob--1" />
                                <div className="sp-price-bar__knob sp-price-bar__knob--2" />
                            </div>
                            <div className="sp-price-vals">
                                <span><strong>€ 0</strong></span>
                                <span><strong>€ 500</strong></span>
                            </div>
                        </div>
                    </aside>

                    {/* ══ AREA PRODOTTI ══ */}
                    <div className="sp-content">

                        {/* ── Toolbar ── */}
                        <div className="sp-toolbar">
                            <div className="sp-toolbar__left">
                                {/* bottone filtri mobile */}
                                <button
                                    className="sp-filter-toggle d-md-none"
                                    onClick={() => setFiltersOpen(true)}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                                        <path d="M3 6h18M7 12h10M11 18h2" />
                                    </svg>
                                    Filtri
                                </button>

                                <span>
                                    <strong>{products.length}</strong>&nbsp;articoli
                                </span>

                                {search && (
                                    <button
                                        className="sp-toolbar__clear"
                                        onClick={() => handleFilterChange('search', '')}
                                    >
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                            <path d="M18 6 6 18M6 6l12 12" />
                                        </svg>
                                        &ldquo;{search}&rdquo;
                                    </button>
                                )}
                            </div>

                            <div className="sp-toolbar__right">
                                {/* sort pill — visibile solo su mobile dove la sidebar è nascosta */}
                                <div className="sp-sort-pill d-md-none">
                                    <span className="sp-sort-pill__lbl">Ordina ·</span>
                                    <select
                                        value={order}
                                        onChange={e => handleFilterChange('sort', e.target.value)}
                                        className="sp-sort-pill__select"
                                    >
                                        {sortOptions.map(o => (
                                            <option key={o.value} value={o.value}>{o.label}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* toggle griglia / lista */}
                                <div className="sp-views" role="group" aria-label="Vista">
                                    <button
                                        className={`sp-views__btn${!listView ? ' sp-views__btn--active' : ''}`}
                                        onClick={() => setListView(false)}
                                        aria-label="Griglia"
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
                                        className={`sp-views__btn${listView ? ' sp-views__btn--active' : ''}`}
                                        onClick={() => setListView(true)}
                                        aria-label="Lista"
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

                        {/* ── Griglia prodotti ── */}
                        {products.length > 0 ? (
                            <div className={`sp-grid${listView ? ' sp-grid--list' : ''}`}>
                                {products.map(product => (
                                    listView ? (
                                        <div key={product.slug} className="sp-grid__item">
                                            <ProductCardList
                                                product={product}
                                                addToCart={() => addToCart(product, 1)}
                                            />
                                        </div>
                                    ) : (
                                        <div key={product.slug} className="sp-grid__item">
                                            <ProductCard
                                                product={product}
                                                addToCart={() => addToCart(product, 1)}
                                            />
                                        </div>
                                    )
                                ))}
                            </div>
                        ) : (
                            <div className="sp-empty">
                                {search
                                    ? <h2>Nessun prodotto trovato</h2>
                                    : <Loader />}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}