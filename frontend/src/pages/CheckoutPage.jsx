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
            <div className="container">
                <h2>dettagli di fatturazione</h2>
                <div className="row ">
                    <div className="col-sm-12 col-md-6">
                        <form class="row g-3">
                            <div class="col-md-6">
                                <label for="inputFullName" class="form-label">Nome e Cognome</label>
                                <input type="text" class="form-control" id="inputFullName" placeholder="Mario Rossi" />
                            </div>
                            <div class="col-md-6">
                                <label for="inputEmail4" class="form-label">Email</label>
                                <input type="email" class="form-control" id="inputEmail4" placeholder="email@email.it" />
                            </div>
                            <div class="col-12">
                                <label for="inputTel" class="form-label">Numero di telefono</label>
                                <input type="tel" class="form-control" id="inputTel" value={phone} onChange={handlePhone} placeholder="3334568752" maxLength="15" />
                            </div>
                            <div class="col-12">
                                <label for="inputAddress" class="form-label">Indirizzo</label>
                                <input type="text" class="form-control" id="inputAddress" placeholder="Via Roma 1" />
                            </div>
                            <div class="col-md-6">
                                <label for="inputCity" class="form-label">Città</label>
                                <input type="text" class="form-control" id="inputCity" placeholder="Roma" />
                            </div>
                            <div class="col-md-4">
                                <label for="inputState" class="form-label">Paese</label>
                                <input type="text" class="form-control" id="inputState" placeholder="Italia" />
                            </div>
                            <div class="col-md-2">
                                <label for="inputZip" class="form-label">Cap</label>
                                <input type="text" class="form-control" id="inputZip" value={zip} onChange={handleZip} placeholder="00100" maxLength="5" />
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary">Sign in</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-12 col-md-6">
                    <h1>CIAOOO</h1>
                    </div>
                </div>




            </div>

        </>
    )
}