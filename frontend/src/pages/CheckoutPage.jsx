import { useState } from "react";
import axios from "axios";
import { useGlobal } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CheckoutPage() {

    const [couponCode, setCouponCode] = useState("");
    const [couponStatus, setCouponStatus] = useState(null); // null | "valid" | "invalid"
    const [couponMessage, setCouponMessage] = useState("");
    const [discount, setDiscount] = useState(0);
    const [appliedCouponId, setAppliedCouponId] = useState(null);
    const [isLoadingCoupon, setIsLoadingCoupon] = useState(false);
    const [couponName, setCouponName] = useState(null)
    const { cart, setCart } = useGlobal()
    const [newOrder, setNewOrder] = useState({
        "user_full_name": "",
        "email": "",
        "phone_number": "",
        "address": "",
        "zipcode": "",
        "city": "",
        "country": "",
        "products": [
            cart.map(item => {
                return {
                    "id": item.id,
                    "quantity": item.quantity
                }
            })
        ]
    })

    const quantityTot = cart.reduce((acc, item) => acc + item.quantity, 0);

    const subtotal = cart.reduce(
        (acc, item) => acc + Number(item.price) * item.quantity,
        0,
    );
    const total = Math.max(0, subtotal - discount);

    function handleChange(e) {
        const { id, value } = e.target;
        setNewOrder(prev => ({ ...prev, [id]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const orderToSend = {
            ...newOrder,
            products: cart.map(item => ({
                id: item.id,
                quantity: item.quantity
            }))
            ,
            coupon_code: couponStatus === "valid" ? couponCode.trim() : undefined
        };

        try {
            const { data } = await axios.post("http://localhost:3000/orders", orderToSend);
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    }

    const handleApplyCoupon = async (e) => {
        e.preventDefault()
        console.log(couponCode)
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
                setAppliedCouponId(data.coupon?.id ?? null);
                setCouponStatus("valid");
                setCouponMessage(`Coupon applicato! Sconto di ${data.discount}€`);
                setCouponName(data.coupon)

                console.log(data)
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
        setAppliedCouponId(null);
        setCouponName(null)
    };



    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="container d-flex justify-content-center p-5">
                    <div className="row row-cols row-cols-sm-1 row-cols-md-2">
                        <div className="col">

                            {/* CONTATTO */}
                            <div className="d-flex justify-content-between align-items-end">
                                <div className="d-flex gap-2 align-items-end mt-4">
                                    <p>01</p>
                                    <h3>Contatto</h3>
                                </div>
                                <p>EMAIL - TELEFONO</p>
                            </div>
                            <hr />
                            <div className="d-flex flex-column gap-2">
                                <div>
                                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                                    <input value={newOrder.email} id="email" onChange={handleChange} type="email" className="form-control" placeholder="email@email.it" required />
                                </div>
                                <div>
                                    <label htmlFor="inputTel" className="form-label">Numero di telefono</label>
                                    <input value={newOrder.phone_number} id="phone_number" onChange={(e) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 15);
                                        handleChange(e);
                                    }} type="text"
                                        inputMode="numeric" className="form-control" placeholder="3334568752" maxLength="15" minLength="11" required />
                                </div>
                            </div>

                            {/* SPEDIZIONE */}
                            <div className="mt-5">
                                <div className="d-flex gap-2 align-items-end">
                                    <p>02</p>
                                    <h3>indirizzo di spedizione</h3>
                                </div>

                            </div>
                            <hr />
                            <div className="d-flex flex-column gap-2">
                                <div>
                                    <label htmlFor="inputFullName" className="form-label">Nome e Cognome</label>
                                    <input value={newOrder.user_full_name} id="user_full_name" onChange={handleChange} type="text" className="form-control" placeholder="Mario Rossi" required />
                                </div>
                                <div>
                                    <label htmlFor="inputAddress" className="form-label">Indirizzo</label>
                                    <input value={newOrder.address} id="address" onChange={handleChange} type="text" className="form-control" placeholder="Via Roma 1" required />
                                </div>
                                <div className="d-flex gap-2 mb-3">
                                    <div>
                                        <label htmlFor="inputCity" className="form-label">Città</label>
                                        <input value={newOrder.city} id="city" onChange={handleChange} type="text" className="form-control" placeholder="Roma" required />
                                    </div>
                                    <div>
                                        <label htmlFor="inputState" className="form-label">Paese</label>
                                        <input value={newOrder.country} id="country" onChange={handleChange} type="text" className="form-control" placeholder="Italia" required />
                                    </div>
                                    <div>
                                        <label htmlFor="inputZip" className="form-label">Cap</label>
                                        <input value={newOrder.zipcode} id="zipcode" onChange={(e) => {
                                            e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 15);
                                            handleChange(e);
                                        }} type="text"
                                            inputMode="numeric" className="form-control" placeholder="00100" maxLength="5" minLength="5" required />
                                    </div>

                                </div>
                            </div>

                        </div>




                        <div className="col">
                            <div className="card">
                                <div className="container">
                                    <div className="d-flex justify-content-between align-items-end">
                                        <div className="d-flex gap-2 align-items-end mt-4">
                                            <p>03</p>
                                            <h3>Il tuo ordine</h3>
                                        </div>
                                        <p>{quantityTot} - PEZZI</p>
                                    </div>
                                    <hr />

                                    <div className="d-flex flex-column gap-3">
                                        {cart.map(item => (
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex flex-column">
                                                    <span>{item.brand_name}</span>
                                                    <span>{item.name} <i class="bi bi-x"></i>{item.quantity}</span>
                                                </div>
                                                <span>€{item.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                    {/* COUPON */}
                                    <div className="d-flex justify-content-center mt-4 mb-4">
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
                                                    placeholder="Codice coupon"
                                                />
                                                {couponStatus === "valid" ? (
                                                    <button className="btn btn-outline-danger" onClick={handleRemoveCoupon} type="button">
                                                        Rimuovi
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn "
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

                                    <hr />

                                    <div className="d-flex flex-column gap-3">
                                        <div className="d-flex justify-content-between">
                                            <span>Subtotale</span>
                                            <span>{subtotal.toFixed(2)}€</span>
                                        </div>
                                        {couponStatus==="valid" &&
                                         <div className="d-flex justify-content-between">
                                            <span>Coupon <span className="text-success fw-bold">{couponName.code}</span></span>
                                            <span className="text-danger fw-bold">-{discount}€</span>
                                        </div> }
                                        <div className="d-flex justify-content-between">
                                            <span>Spedizione · standard 24/48h</span>
                                            <span className="text-success">GRATUITA</span>
                                        </div>
                                    </div>

                                    <hr />
                                    
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5>TOTALE</h5>
                                        <h1>€ {total.toFixed(2)}</h1>
                                    </div>
                                    <span>EUR · IVA inclusa · senza costi nascosti</span>
                                    <div className="d-flex justify-content-center mt-4 mb-3">
                                         <button type="submit" className="btn btn-dark px-5 py-2">paga € {total.toFixed(2)} <i class="bi bi-arrow-right"></i></button>
                                    </div>

                                    <hr />

                                    <div className="d-flex flex-column gap-4">
                                        <div className="d-flex gap-2">
                                            <div><i class="bi bi-hand-thumbs-up"></i></div>
                                            <div className="d-flex flex-column">
                                                <span>Pagamento protetto</span>
                                                <span>SSL 256-bit · 3-D Secure su ogni carta</span>

                                            </div>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <div><i class="bi bi-truck"></i></div>
                                            <div className="d-flex flex-column">
                                                <span>Spedito da Milano</span>
                                                <span>Corriere espresso · consegna 24/48h, tracciata</span>

                                            </div>
                                        </div>
                                         <div className="d-flex gap-2">
                                            <div><i class="bi bi-arrow-clockwise"></i></div>
                                            <div className="d-flex flex-column">
                                                <span>30 giorni per ripensarci</span>
                                                <span>Resi gratuiti, ritiro a domicilio incluso</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}