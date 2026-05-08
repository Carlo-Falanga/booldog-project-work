import { useState } from "react";

export default function CheckoutPage() {
    const [phone, setPhone] = useState("");
    const [zip, setZip] = useState("")

    const handlePhone = (e) => {
        const value = e.target.value;
        const numericValue = value.replace(/[^0-9]/g, '');
        setPhone(numericValue);
    };

    const handleZip = (e) => {
        const value = e.target.value;
        const numericValue = value.replace(/[^0-9]/g, '');
        setZip(numericValue);
    };


    return (
        <>
            
            
                <div className="row">

                    <div className="col-sm-12 col-md-6 pt-5 px-5">
                        <h5 className="pb-4 fw-bold">DETTAGLI DI FATTURAZIONE</h5>
                        <form class="row g-3">
                            <div class="col-md-6">
                                <label htmlFor="inputFullName" class="form-label">Nome e Cognome</label>
                                <input type="text" class="form-control" id="inputFullName" placeholder="Mario Rossi" />
                            </div>
                            <div class="col-md-6">
                                <label htmlFor="inputEmail4" class="form-label">Email</label>
                                <input type="email" class="form-control" id="inputEmail4" placeholder="email@email.it" />
                            </div>
                            <div class="col-12">
                                <label htmlFor="inputTel" class="form-label">Numero di telefono</label>
                                <input type="tel" class="form-control" id="inputTel" value={phone} onChange={handlePhone} placeholder="3334568752" maxLength="15" />
                            </div>
                            <div class="col-12">
                                <label htmlFor="inputAddress" class="form-label">Indirizzo</label>
                                <input type="text" class="form-control" id="inputAddress" placeholder="Via Roma 1" />
                            </div>
                            <div class="col-md-6">
                                <label htmlFor="inputCity" class="form-label">Città</label>
                                <input type="text" class="form-control" id="inputCity" placeholder="Roma" />
                            </div>
                            <div class="col-md-4">
                                <label htmlFor="inputState" class="form-label">Paese</label>
                                <input type="text" class="form-control" id="inputState" placeholder="Italia" />
                            </div>
                            <div class="col-md-2">
                                <label htmlFor="inputZip" class="form-label">Cap</label>
                                <input type="text" class="form-control" id="inputZip" value={zip} onChange={handleZip} placeholder="00100" maxLength="5" />
                            </div>
                            <div class="col-12 d-flex justify-content-center">
                                <button type="submit" class="btn btn-primary">Invia</button>
                            </div>
                        </form>
                    </div>

                    

                    <div id="order_section" className="col-sm-12 col-md-6 pt-5 px-5 text-white">
                        <h5 className="pb-4 fw-bold">IL TUO ORDINE</h5>
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="fw-bold">Prodotto</p>
                            </div>
                            <div>
                                <p className="fw-bold">Subtotale</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="fw-bold">TOTALE</p>
                            </div>
                            <div>
                                {/* totale */}
                            </div>
                        </div>
                        <div className="pt-3">
                            <label htmlFor="inputCoupon" className="form-label fw-bold d-flex justify-content-center">Codice sconto</label>
                            <input type="text" class="form-control" id="inputCoupon" maxLength="20" />
                        </div>


                    </div>
                </div>




            

        </>
    )
}