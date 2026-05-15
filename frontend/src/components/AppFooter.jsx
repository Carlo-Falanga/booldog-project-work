import booldog_logo from "../assets/logo/logo_booldog.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function AppFooter() {
  const [openCookiePolicy, setOpenCookiePolicy] = useState(false);
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false);
  const [openTermsPolicy, setOpenTermsPolicy] = useState(false);

  function toggleCookiePolicy() {
    setOpenCookiePolicy(!openCookiePolicy);
  }
  function togglePrivacyPolicy() {
    setOpenPrivacyPolicy(!openPrivacyPolicy);
  }
  function toggleTermsPolicy() {
    setOpenTermsPolicy(!openTermsPolicy);
  }

  return (
    <footer className="py-4 mt-auto bg-black container-fluid">
      <div className="d-flex justify-content-center mb-5">
        <img className="logo_footer" src={booldog_logo} alt="BoolDog logo" />
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div className="col">
          <div className="d-flex flex-column align-items-center">
            <div>
              <h3 className="text-white">Informazioni legali e aziendali</h3>
            </div>
            <div className="d-flex gap-3">
              <h6 className="text-white">Ragione sociale:</h6>
              <h6 className="text-white">BoolDog S.r.l.</h6>
            </div>
            <div className="d-flex gap-2">
              <h6 className="text-white">Sede&nbsp;legale:</h6>
              <h6 className="text-white">
                Via delle Margherite, 14 - 20121 Milano (MI), Italia
              </h6>
            </div>
            <div className="d-flex gap-3">
              <h6 className="text-white">P.IVA:</h6>
              <h6 className="text-white">IT 04782631098</h6>
            </div>
            <div className="d-flex gap-3">
              <h6 className="text-white">REA:</h6>
              <h6 className="text-white">MI - 2187634</h6>
            </div>
            <div className="d-flex gap-3">
              <h6 className="text-white">Capitale sociale:</h6>
              <h6 className="text-white">€10.000,00 i.v.</h6>
            </div>
            <li className="d-flex gap-3">
              <h6 className="text-white">PEC:</h6>
              <h6 className="text-white">booldog@pec.it</h6>
            </li>
            <div className="d-flex flex-column align-items-center ">
              <button
                onClick={toggleCookiePolicy}
                className="hover_footer border border-0 bg-transparent"
              >
                <h6 className="text-white">Cookie Policy</h6>
              </button>
              {openCookiePolicy && (
                <p className="text-white text-center">
                  Questo sito utilizza cookie tecnici e, previo consenso, cookie
                  di profilazione. Per maggiori informazioni consulta la nostra
                  Cookie Policy.
                </p>
              )}
            </div>
            <div className="d-flex flex-column align-items-center ">
              <button
                onClick={togglePrivacyPolicy}
                className="hover_footer border border-0 bg-transparent"
              >
                <h6 className="text-white">Privacy Policy</h6>
              </button>
              {openPrivacyPolicy && (
                <p className="text-white text-center">
                  I dati personali sono trattati da BoolDog S.r.l. in qualità di
                  Titolare del Trattamento, ai sensi del Regolamento UE 2016/679
                  (GDPR).
                </p>
              )}
            </div>
            <div className="d-flex flex-column align-items-center ">
              <button
                onClick={toggleTermsPolicy}
                className="hover_footer border border-0 bg-transparent"
              >
                <h6 className="text-white">Termini e Condizioni</h6>
              </button>
              {openTermsPolicy && (
                <p className="text-white text-center">
                  L'acquisto dei prodotti su booldog.it è regolato dai presenti
                  Termini e Condizioni. Il consumatore ha diritto di recesso
                  entro 14 giorni dalla ricezione del prodotto.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="col d-flex flex-column align-items-center text-center ">
          <ul className="list-unstyled">
            <li>
              <h3 className="text-white">Navigazione utile</h3>
            </li>
            <Link className="text-decoration-none" to="/">
              <li className="hover_footer text-white">Homepage</li>
            </Link>
            <Link className="text-decoration-none" to="/products">
              <li className="hover_footer text-white">Prodotti</li>
            </Link>
            <Link className="text-decoration-none" to="/wishlist">
              <li className="hover_footer text-white">
                I tuoi prodotti preferiti
              </li>
            </Link>
            <Link className="text-decoration-none" to="*">
              <li className="hover_footer text-white">Chi siamo</li>
            </Link>
          </ul>
        </div>

        <div className="col d-flex flex-column align-items-center">
          <ul className="list-unstyled d-flex flex-column align-items-center">
            <li>
              <h3 className="text-white">Assistenza clienti</h3>
            </li>
            <li className="d-flex gap-3">
              <h6 className="text-white">Email:</h6>
              <h6 className="text-white">info@booldog.it</h6>
            </li>
            <li className="d-flex gap-3">
              <h6 className="text-white">Telefono:</h6>
              <h6 className="text-white">+39 02 4871 2233</h6>
            </li>
          </ul>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 mt-3 g-4">
        <div className="col d-flex flex-column align-items-center">
          <ul className="list-unstyled d-flex flex-column align-items-center">
            <li>
              <h3 className="text-white">Pagamenti e sicurezza</h3>
            </li>

            <li className="row g-3 justify-content-center text-center text-white">
              <div className="col-4 col-md-auto">
                <i className="fa-brands fa-cc-visa fa-2x"></i>
              </div>
              <div className="col-4 col-md-auto">
                <i className="fa-brands fa-cc-mastercard fa-2x"></i>
              </div>
              <div className="col-4 col-md-auto">
                <i className="fa-brands fa-cc-paypal fa-2x"></i>
              </div>
              <div className="col-4 col-md-auto">
                <i className="fa-brands fa-cc-apple-pay fa-2x"></i>
              </div>
              <div className="col-4 col-md-auto">
                <i className="fa-brands fa-cc-stripe fa-2x"></i>
              </div>
            </li>
          </ul>
        </div>

        <div className="col d-flex flex-column align-items-center">
          <ul className="list-unstyled d-flex flex-column align-items-center">
            <li>
              <h3 className="text-white">Social</h3>
            </li>

            <li className="row g-3 justify-content-center text-center text-white">
              <div className="col-4 col-md-auto hover_footer">
                <a href="#" className=" text-decoration-none text-white">
                  <i className="fa-brands fa-instagram fa-2x"></i>
                </a>
              </div>
              <div className="col-4 col-md-auto hover_footer">
                <a href="#" className=" text-decoration-none text-white">
                  <i className="fa-brands fa-facebook fa-2x"></i>
                </a>
              </div>
              <div className="col-4 col-md-auto hover_footer">
                <a href="#" className=" text-decoration-none text-white">
                  <i className="fa-brands fa-tiktok fa-2x"></i>
                </a>
              </div>
              <div className="col-4 col-md-auto hover_footer">
                <a href="#" className=" text-decoration-none text-white">
                  <i className="fa-brands fa-x-twitter fa-2x"></i>
                </a>
              </div>
              <div className="col-4 col-md-auto hover_footer">
                <a href="#" className=" text-decoration-none text-white">
                  <i className="fa-brands fa-whatsapp fa-2x"></i>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center gap-2  ">
        <span className="text-white mb-0 small">
          © {new Date().getFullYear()} BoolDog — Tutti i diritti riservati
        </span>
      </div>
    </footer>
  );
}
