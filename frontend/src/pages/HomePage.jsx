import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3000";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("tutti");
  const [marchi, setMarchi] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/products`)
      .then((res) => {
        const featured = res.data.filter(
          (p) => p.is_featured === 1 || p.is_featured === true,
        );
        setProducts(featured);
        setFilteredProducts(featured);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/brands`)
      .then((res) => setMarchi(res.data))
      .catch((err) => console.error("Errore caricamento brand:", err));
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section className="custom_hero">
        <div className="container-fluid p-0 mb-5">
          <div className="row g-0 align-items-stretch">
            <div className="col-lg-6 d-flex flex-column justify-content-between py-5 hero-text-col">
              <div className="d-flex align-items-center gap-3 mb-4 mb-md-5"></div>

              <h1 className="headline mb-4">
                Il meglio per
                <br />
                cani e gatti,
                <br />
                <em>ogni giorno.</em>
              </h1>

              <div>
                <p
                  className="fs-5 text-body-secondary mb-4"
                  style={{ maxWidth: "44ch" }}
                >
                  Giochi, accessori e tanto amore. Scopri i nostri prodotti
                  selezionati per il benessere del tuo animale.
                </p>
                <div className="d-flex flex-wrap gap-2 mb-5">
                  <a
                    href="#prodotti"
                    className="btn btn-dark rounded-pill px-4 py-3 d-inline-flex align-items-center gap-2 btn-cta"
                  >
                    Scopri i prodotti
                    <i className="bi bi-arrow-right"></i>
                  </a>
                  <a
                    href="#categorie"
                    className="btn btn-outline-dark rounded-pill px-4 py-3"
                  >
                    Sfoglia categorie
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="overflow-hidden h-100 hero-feature">
                <img
                  src="/pets/canegatto.jpg"
                  alt="Un cane e un gatto"
                  className="w-100 h-100 object-fit-cover d-block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIE ── */}
      <section id="categorie" className="container py-5 my-5">
        <header className="border-bottom pb-5 my-5">
          <h2 className="section-title mb-0">
            Due animali, due <em>universi.</em>
            <br />
            Una sola filosofia.
          </h2>
        </header>

        <div className="d-flex flex-column gap-3 gap-md-4 mb-5">
          <article
            id="cane"
            className="card border overflow-hidden rounded-3 cat-card mb-4"
          >
            <div className="row g-0 h-100">
              <div className="col-lg-5 order-2 order-lg-1">
                <div className="card-body p-4 p-md-5 d-flex flex-column justify-content-between h-100 card_background">
                  <div>
                    <h3 className="cat-title mb-0">
                      Per il <em>cane</em>
                      <br />
                      di casa.
                    </h3>
                    <p
                      className="mt-4 text-body-secondary"
                      style={{ maxWidth: "38ch" }}
                    >
                      Giochi, guinzagli, cucce e tanto altro per il benessere del
                      tuo cane.
                    </p>
                  </div>
                  <div className="border-top mt-4 pt-4 d-flex justify-content-end">
                    <Link
                      to="/products/animal/cane"
                      className="btn btn-dark rounded-circle d-inline-flex align-items-center justify-content-center cta-circle"
                      aria-label="Sfoglia cane"
                    >
                      <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 order-1 order-lg-2 cat-card-img-wrap">
                <img
                  src="/pets/cane.jpg"
                  alt="Cane"
                  className="w-100 h-100 object-fit-cover d-block"
                />
              </div>
            </div>
          </article>

          <article
            id="gatto"
            className="card border overflow-hidden rounded-3 cat-card"
          >
            <div className="row g-0 h-100">
              <div className="col-lg-7 cat-card-img-wrap">
                <img
                  src="/pets/gatto.jpg"
                  alt="Gatto"
                  className="w-100 h-100 object-fit-cover d-block"
                />
              </div>
              <div className="col-lg-5">
                <div className="card-body p-4 p-md-5 d-flex flex-column justify-content-between h-100 card_background">
                  <div>
                    <h3 className="cat-title mb-0">
                      Per il <em>gatto</em>
                      <br />
                      che decide.
                    </h3>
                    <p
                      className="mt-4 text-body-secondary"
                      style={{ maxWidth: "38ch" }}
                    >
                      Lettiere, giocattoli e accessori per il tuo
                      gatto.
                    </p>
                  </div>
                  <div className="border-top mt-4 pt-4 d-flex justify-content-end">
                    <Link
                      to="/products/animal/gatto"
                      className="btn btn-dark rounded-circle d-inline-flex align-items-center justify-content-center cta-circle"
                      aria-label="Sfoglia gatto"
                    >
                      <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ── PRODOTTI IN EVIDENZA ── */}
      <section id="prodotti" className="container py-5 my-5">
        <header className="border-bottom pb-3 my-5">
          <h2 className="section-title mb-0">
            Prodotti <em>in evidenza.</em>
          </h2>
        </header>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-0 border-top border-start">
          {filteredProducts.map((product) => (
            <div className="col" key={product.id}>
              <div className="card h-100 rounded-0 border-0 border-end border-bottom bg-body-tertiary product-card">
                <div className="ratio ratio-4x3 bg-white border-bottom overflow-hidden">
                  <img
                    src={`http://localhost:3000/images/products/${product.img_url}`}
                    alt={product.name}
                    className="object-fit-contain product-card-img"
                  />
                </div>

                <Link
                  to={`/product/${product.slug}`}
                  className="card-body d-flex flex-column p-4 text-decoration-none text-body"
                >
                  <div className="d-flex flex-wrap gap-1 mb-3">
                    {product.category && (
                      <span className="badge rounded-pill eyebrow fw-medium px-2 py-1 bg-body-secondary text-body-secondary border">
                        {product.category}
                      </span>
                    )}
                  </div>

                  <h5 className="card-title fw-normal mb-2">{product.name}</h5>
                  <p className="card-text small text-body-secondary flex-grow-1 mb-4">
                    {product.description ||
                      "Prodotto di qualità per il tuo animale."}
                  </p>

                  <div className="d-flex align-items-center justify-content-between border-top pt-3">
                    <span className="product-price fs-3 fw-normal">
                      €{Number(product.price).toFixed(2)}
                    </span>
                    <span className="rounded-circle border d-inline-flex align-items-center justify-content-center product-card-arrow">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MARCHI ── */}
      <section
        id="marchi"
        className="custom_brand_bg text-light overflow-hidden"
      >
        <div className="container-fluid py-5 my-md-5 section-side-gutter">
          <header className="pb-3 mb-5 partners-head">
            <h2 className="section-title mb-0 text-light">
              Le case che <em>scegliamo,</em>
              <br />e che scelgono noi.
            </h2>
          </header>

          <p className="fs-5 mb-5 partners-lede" style={{ maxWidth: "56ch" }}>
            Prodotti europei selezionati uno per uno — per qualità dei
            materiali, rispetto degli animali e prodotti che durano nel tempo.
          </p>

          <div
            className="row row-cols-2 row-cols-md-5 g-0"
            aria-label="Marchi partner"
          >
            {marchi.map((marchio) => (
              <div
                className="col d-flex align-items-center justify-content-center p-4"
                key={marchio.id}
              >
                <img
                  src={`${API_URL}/images/brands/${marchio.logo_url}`}
                  alt={marchio.name}
                  className="brand-img p-2"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
