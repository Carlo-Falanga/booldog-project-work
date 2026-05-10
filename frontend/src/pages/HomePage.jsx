import { useState, useEffect } from 'react'
import axios from 'axios'
import './HomePage.css'

const API_URL = 'http://localhost:3000'

function HomePage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeFilter, setActiveFilter] = useState('tutti')

  // chiamata axios per i prodotti in evidenza
  useEffect(() => {
    axios.get(`${API_URL}/products`)
      .then(res => {
        const featured = res.data.filter(product => product.is_featured === 1 || product.is_featured === true)
        setProducts(featured)
        setFilteredProducts(featured)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  // filtra i prodotti 
  useEffect(() => {
    if (activeFilter === 'tutti') {
      setFilteredProducts(products)
    } else if (activeFilter === 'cane') {
      setFilteredProducts(products.filter(product => product.animal_type_id === 1 || product.animal_type_id === 3))
    } else if (activeFilter === 'gatto') {
      setFilteredProducts(products.filter(product => product.animal_type_id === 2 || product.animal_type_id === 3))
    }
  }, [activeFilter, products])

  const getAnimalEmoji = (animal_type_id) => {
    if (animal_type_id === 1) return '🐶'
    if (animal_type_id === 2) return '🐱'
    if (animal_type_id === 3) return '🐾'
    return '🐾'
  }

  const getAnimalName = (animal_type_id) => {
    if (animal_type_id === 1) return 'Cane'
    if (animal_type_id === 2) return 'Gatto'
    if (animal_type_id === 3) return 'Cane e Gatto'
    return ''
  }

  const getAnimalBadgeClass = (animal_type_id) => {
    if (animal_type_id === 1) return 'bg-warning text-dark'
    if (animal_type_id === 2) return 'bg-primary'
    if (animal_type_id === 3) return 'bg-success'
    return 'bg-secondary'
  }

  return (
    <>
      {/* jumbotron*/}
      <div className="hero py-5 text-white text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="mb-3">
                <span className="badge bg-warning text-dark fs-6 px-3 py-2">
                  🐶 🐱 Tutto per i tuoi amici a 4 zampe
                </span>
              </div>
              <h1 className="display-4 fw-bold mb-3">
                Il meglio per cani e gatti,<br /> ogni giorno
              </h1>
              <p className="lead mb-4 hero__subtitle">
                Cibo, accessori e tanto amore. Scopri i nostri prodotti selezionati
                per il benessere del tuo animale.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <a href="#prodotti" className="btn btn-warning btn-lg fw-semibold px-4">
                  Scopri i prodotti
                </a>
                <a href="#categorie" className="btn btn-outline-light btn-lg px-4">
                  Sfoglia categorie
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          </div>
        </div>
      </section>

      {/* prodotti in evidenza */}
      <section id="prodotti" className="py-5">
        <div className="container">
          <h2 className="fw-bold text-center mb-2">Prodotti in evidenza</h2>
          <p className="text-center text-muted mb-4">I più amati dai nostri clienti</p>

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

          {/* Stato caricamento */}
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Caricamento...</span>
              </div>
              <p className="mt-3 text-muted">Caricamento prodotti...</p>
            </div>
          )}

          {/* Stato errore */}
          {error && (
            <div className="alert alert-danger text-center" role="alert">
              ⚠️ {error} — il server non è in esecuzione
            </div>
          )}

          {/* Nessun prodotto */}
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="text-center text-muted py-5">
              <div className="empty-state__icon">🔍</div>
              <p className="mt-2">Nessun prodotto trovato.</p>
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
                        <img src={`/images/${product.img_url}`} alt={product.name}/>

                //if/else immagine
                    ) : (
                        <span className="product-card__emoji">
                          {getAnimalEmoji(product.animal_type_id)}
                        </span>
                      )}
                    </div>

                    <div className="card-body d-flex flex-column">
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

                      <h5 className="card-title fw-semibold">{product.name}</h5>
                      <p className="card-text text-muted small flex-grow-1">
                        {product.description || 'Prodotto di qualità per il tuo animale.'}
                      </p>

                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="fs-5 fw-bold">€{Number(product.price).toFixed(2)}</span>
                        <button
                          className="btn btn-dark btn-sm px-3"
                          disabled={product.stock === 0}>
                          {product.stock === 0 ? 'Esaurito' : 'Aggiungi 🛒'}
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default HomePage
