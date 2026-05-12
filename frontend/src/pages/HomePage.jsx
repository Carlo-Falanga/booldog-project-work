import { useState, useEffect } from 'react'
import axios from 'axios'
import './HomePage.css'
import {Link, NavLink} from "react-router-dom"

const API_URL = 'http://localhost:3000'

function HomePage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeFilter, setActiveFilter] = useState('tutti')

  useEffect(() => {
    axios.get(`${API_URL}/products`)
      .then(res => {
        const featured = res.data.filter(p => p.is_featured === 1 || p.is_featured === true)
        setProducts(featured)
        setFilteredProducts(featured)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (activeFilter === 'tutti') {
      setFilteredProducts(products)
    } else if (activeFilter === 'cane') {
      setFilteredProducts(products.filter(p => p.animal_type_id === 1 || p.animal_type_id === 3))
    } else if (activeFilter === 'gatto') {
      setFilteredProducts(products.filter(p => p.animal_type_id === 2 || p.animal_type_id === 3))
    }
  }, [activeFilter, products])

  const getAnimalEmoji = (id) => {
    if (id === 1) return '🐶'
    if (id === 2) return '🐱'
    return '🐾'
  }

  const getAnimalName = (id) => {
    if (id === 1) return 'Cane'
    if (id === 2) return 'Gatto'
    if (id === 3) return 'Cane & Gatto'
    return ''
  }

  const getAnimalBadgeClass = (id) => {
    if (id === 1) return 'badge--dog'
    if (id === 2) return 'badge--cat'
    return 'badge--both'
  }

  return (
    <>
      {/* jumbo */}
      <section className="hero">

        <div className="hero__grid">
          <div className="hero__left">
            <div className="hero__tag">
              <span className="hero__tag-num">01</span>
              <span className="hero__tag-rule" />
              <span className="hero__tag-label">Selezione SS&apos;26</span>
            </div>
            <h1 className="hero__headline">
              Il meglio per<br />
              cani e gatti,<br />
              <em>ogni giorno.</em>
            </h1>
            <div className="hero__blurb">
              <p>
                Cibo, accessori e tanto amore. Scopri i nostri prodotti
                selezionati per il benessere del tuo animale.
              </p>
              <div className="hero__cta">
                <a href="#prodotti" className="btn btn--primary">
                  Scopri i prodotti
                  <svg className="btn__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="#categorie" className="btn btn--ghost">
                  Sfoglia categorie
                </a>
              </div>
            </div>
          </div>

          <aside className="hero__feature">
            <img
              src="/public/pets/canegatto.jpg"
              alt=""
              className="hero__feature-img"
            />
          </aside>
        </div>

        {/* strip metriche */}
        {/* <div className="hero__meta" aria-hidden="true">
          <div>
            <span className="hero__meta-num">∞</span>
            <span><strong>Spedizione gratuita</strong>su ogni ordine, sempre</span>
          </div>
          <div>
            <span className="hero__meta-num">22</span>
            <span><strong>Marchi premium</strong>europei selezionati</span>
          </div>
          <div>
            <span className="hero__meta-num">30</span>
            <span><strong>Giorni di prova</strong>resi gratuiti</span>
          </div>
          <div>
            <span className="hero__meta-num">∞</span>
            <span><strong>Veterinari</strong>al telefono inclusi</span>
          </div>
        </div> */}
      </section>

      {/* categorie */}
      <section id="categorie" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-2">Scegli il tuo animale</h2>
          <p className="text-center text-muted mb-5">
            Prodotti pensati appositamente per cani e gatti
          </p>

          <div className="row g-4 justify-content-center">
            {/* card cane */}
            <div className="col-sm-6 col-md-5">
              <div className="card category-card category-card--dog border-0 shadow-sm text-white text-center h-100">
                <div className="card-body py-5">
                  <div style={{ fontSize: '4rem' }}>🐶</div>
                  <h3 className="card-title fw-bold mt-3">Cane</h3>
                  <p className="card-text category-card__text">
                    Cibo, guinzagli, giochi e tanto altro per il tuo cane
                  </p>
                  <a href="#" className="btn btn-light fw-semibold mt-2">Esplora →</a>
                </div>
              </div>
            </div>

            {/* card gatto */}
            <div className="col-sm-6 col-md-5">
              <div className="card category-card category-card--cat border-0 shadow-sm text-white text-center h-100">
                <div className="card-body py-5">
                  <div style={{ fontSize: '4rem' }}>🐱</div>
                  <h3 className="card-title fw-bold mt-3">Gatto</h3>
                  <p className="card-text category-card__text">
                    Lettiere, crocchette, giocattoli e accessori per il tuo gatto
                  </p>
                  <a href="#" className="btn btn-light fw-semibold mt-2">Esplora →</a>
                </div>
              </div>
            </div>
            <div className="cat-row__image cat-row__image--cat">
              <img src="/public/pets/gatto.jpg" alt="Gatto" className="cat-row__image-img" />
            </div>
          </article>
        </div>
      </section>

      {/* prodotti in evidenza*/}
      <section id="prodotti" className="section section--products">
        <div className="section__head">
          <span className="section__num">03 — In evidenza</span>
          <h2 className="section__title">
            Prodotti <em>in evidenza.</em>
          </h2>
        </div>

          {/* Filtri */}
          <div className="d-flex justify-content-center gap-2 mb-5">
            {[
              { key: 'tutti', label: '🐾 Tutti' },
              { key: 'cane',  label: '🐶 Cane' },
              { key: 'gatto', label: '🐱 Gatto' },].map(({ key, label }) => (
              <button
                key={key}
                className={`btn btn-sm px-4 ${activeFilter === key ? 'btn-dark' : 'btn-outline-dark'}`}
                onClick={() => setActiveFilter(key)}>
                {label}
              </button>
            ))}
          </div>

        {/* Caricamento */}
        {loading && (
          <div className="products__state">
            <div className="products__spinner" role="status">
              <span className="visually-hidden">Caricamento...</span>
            </div>
            <p>Caricamento prodotti...</p>
          </div>
        )}

        {/* Errore */}
        {error && (
          <div className="products__error" role="alert">
            ⚠️ {error} — il server non è in esecuzione
          </div>
        )}

        {/* Vuoto */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="products__empty">
            <span className="products__empty-icon">🔍</span>
            <p>Nessun prodotto trovato.</p>
          </div>
        )}

          {/* Griglia prodotti */}
          {!loading && !error && filteredProducts.length > 0 && (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              {filteredProducts.map(product => (
                <div className="col" key={product.id}>
                  <div className="card h-100 border-0 shadow-sm">

                    {/* Immagine prodotto */}
                    <div className="product-card__image d-flex align-items-center justify-content-center bg-light">
                      {product.img_url ? (
                        <img className=" object-fit-contain" src={`http://localhost:3000/images/products/${product.img_url}`} />

                //if/else immagine
                    ) : (
                        <span className="product-card__emoji">
                          {getAnimalEmoji(product.animal_type_id)}
                        </span>
                      )}
                    </div>

                    <Link to={`/product/${product.slug}`}  className="card-body d-flex flex-column text-decoration-none">
                      {/* Badge animale */}
                      <span className={`badge mb-2 product-card__badge ${getAnimalBadgeClass(product.animal_type_id)}`}>
                        {getAnimalEmoji(product.animal_type_id)} {getAnimalName(product.animal_type_id)}
                      </span>

                      {/* Badge categoria */}
                      {product.category && (
                        <span className="badge bg-light text-dark border mb-2 product-card__badge">
                          {product.category}
                        </span>
                      )}

                  <h5 className="product-card__name">{product.name}</h5>
                  <p className="product-card__desc">
                    {product.description || 'Prodotto di qualità per il tuo animale.'}
                  </p>

                  <div className="product-card__footer">
                    <span className="product-card__price">
                      €{Number(product.price).toFixed(2)}
                    </span>
                    <span className="product-card__arrow">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
}

export default HomePage

   
