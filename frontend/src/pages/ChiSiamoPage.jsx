import {Link} from "react-router-dom";

export default function ChiSiamoPage() {
    return (
        <div className="container mt-5 mb-5">
            <div className="card rounded-4 p-4 bg-paper">
                <div className="d-flex justify-content-start align-items-center m-3">
                    <Link to="/">
                        <button className="btn btn-dark rounded-pill border-0 btn_cart">
                            <i className="bi bi-arrow-left-short"></i>Torna alla Home
                        </button>
                    </Link>
                </div>
                <h3 className="cart-hero mt-3 mb-5 d-flex justify-content-center">
                    <span className="d-block">
                        Chi
                    </span>
                    <em className="d-block">Siamo</em>
                </h3>
                <div className="text-center">
                    <p>
                        Chi ha un cane o un gatto lo sa bene: non sono animali domestici. Sono compagni di vita.
                    </p>
                    <p>
                        BoolDog nasce da questa consapevolezza. Abbiamo cercato tra centinaia di marchi quelli che condividono la nostra stessa idea di qualità — materiali sicuri, lavorazioni curate, prodotti pensati per durare e li abbiamo riuniti in un unico posto.
                    </p>
                    <p>
                        Troverai ciò che abbiamo scelto, con la stessa attenzione che riserveresti al tuo animale. Perché il nostro lavoro non è venderti qualcosa — è farti trovare la cosa giusta.
                    </p>
                    <p>

                    </p>
                </div>


            </div>
        </div>


    )
}