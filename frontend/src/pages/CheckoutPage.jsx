import { useState } from "react";
import axios from "axios";

export default function CheckoutPage() {
    const [phone, setPhone] = useState("");
    const [zip, setZip] = useState("");
    const [couponCode, setCouponCode] = useState("");
    const [couponStatus, setCouponStatus] = useState(null); // null | "valid" | "invalid"
    const [couponMessage, setCouponMessage] = useState("");
    const [discount, setDiscount] = useState(0);
    const [isLoadingCoupon, setIsLoadingCoupon] = useState(false);

    const subtotal = 110.00;
    const total = Math.max(0, subtotal - discount);

    const handlePhone = (e) => {
        const value = e.target.value;
        setPhone(value.replace(/[^0-9]/g, ''));
    };

    const handleZip = (e) => {
        const value = e.target.value;
        setZip(value.replace(/[^0-9]/g, ''));
    };

    const handleApplyCoupon = async (e) => {
        e.preventDefault()
        if (!couponCode.trim()) return;

        setIsLoadingCoupon(true);
        setCouponStatus(null);
        setCouponMessage("");
        setDiscount(0);

        try {
            const { data } = await axios.post("http://localhost:3000/validate", {
                code: couponCode.trim(),
                cart_total: subtotal
            });

            if (data.valid) {
                setDiscount(data.discount);
                setCouponStatus("valid");
                setCouponMessage(`Coupon applicato! Sconto di ${data.discount}€`);
            } else {
                setDiscount(0);
                setCouponStatus("invalid");
                setCouponMessage(data.message || "Coupon non valido");
            }
        } catch (err) {
            setDiscount(0);
            setCouponStatus("invalid");
            setCouponMessage(err.response?.data?.message || "Errore nella verifica del coupon");
        } finally {
            setIsLoadingCoupon(false);
        }
    };

    const handleRemoveCoupon = () => {
        setCouponCode("");
        setCouponStatus(null);
        setCouponMessage("");
        setDiscount(0);
    };

    return (
        <>
            <div className="row">

                
                <div className="col-sm-12 col-md-6 pt-5 px-5">
                    <h5 className="pb-4 fw-bold">DETTAGLI DI FATTURAZIONE</h5>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="inputFullName" className="form-label">Nome e Cognome</label>
                            <input type="text" className="form-control" id="inputFullName" placeholder="Mario Rossi" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputEmail4" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail4" placeholder="email@email.it" />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputTel" className="form-label">Numero di telefono</label>
                            <input type="tel" className="form-control" id="inputTel" value={phone} onChange={handlePhone} placeholder="3334568752" maxLength="15" />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputAddress" className="form-label">Indirizzo</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="Via Roma 1" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputCity" className="form-label">Città</label>
                            <input type="text" className="form-control" id="inputCity" placeholder="Roma" />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputState" className="form-label">Paese</label>
                            <input type="text" className="form-control" id="inputState" placeholder="Italia" />
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="inputZip" className="form-label">Cap</label>
                            <input type="text" className="form-control" id="inputZip" value={zip} onChange={handleZip} placeholder="00100" maxLength="5" />
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary">Invia</button>
                        </div>
                    </form>
                </div>


                <div id="order_section" className="col-sm-12 col-md-6 pt-5 px-5 text-white">
                    <h5 className="pb-4 fw-bold">IL TUO ORDINE</h5>


                    <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                        <span className="fw-bold">Prodotto</span>
                        <span className="fw-bold">Subtotale</span>
                    </div>


                    <div className="d-flex justify-content-between mb-2">
                        <span>Subtotale</span>
                        <span>{subtotal.toFixed(2)}€</span>
                    </div>

                    
                    {discount > 0 && (
                        <div className="d-flex justify-content-between mb-2 text-success">
                            <span>Sconto coupon</span>
                            <span>- {discount.toFixed(2)}€</span>
                        </div>
                    )}


                    <div className="d-flex justify-content-between fw-bold border-top pt-2 mt-2">
                        <span>TOTALE</span>
                        <span>{total.toFixed(2)}€</span>
                    </div>

                    <div className="pt-4">
                        <label htmlFor="inputCoupon" className="form-label fw-bold d-flex justify-content-center">
                            Codice sconto
                        </label>

                        <form onSubmit={handleApplyCoupon}>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className={`form-control ${couponStatus === "valid" ? "is-valid" : couponStatus === "invalid" ? "is-invalid" : ""}`}
                                    id="inputCoupon"
                                    maxLength="20"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    disabled={couponStatus === "valid"}
                                    placeholder="Inserisci codice..."
                                />
                                {couponStatus === "valid" ? (
                                    <button className="btn btn-outline-danger" onClick={handleRemoveCoupon} type="button">
                                        Rimuovi
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-outline-light"
                                        onClick={handleApplyCoupon}
                                        type="button"
                                        disabled={isLoadingCoupon || !couponCode.trim()}
                                    >
                                        {isLoadingCoupon ? (
                                            <span className="spinner-border spinner-border-sm" />
                                        ) : "Applica"}
                                    </button>
                                )}
                            </div>

                           
                            {couponMessage && (
                                <div className={`mt-2 small ${couponStatus === "valid" ? "text-success" : "text-danger"}`}>
                                    {couponMessage}
                                </div>
                            )}
                        </form>
                    </div>


                </div>
            </div >
        </>
    );
}