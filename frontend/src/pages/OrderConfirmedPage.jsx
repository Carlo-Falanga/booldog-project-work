
import { useParams } from "react-router-dom"
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function OrderConfirmedPage() {

    const { id } = useParams()
    const [data, setData] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:3000/orders/${id}`, {
            params: { id: id }
        })
            .then(({ data }) => {
                setData(data)
            })
    }, [])

    return (
        <>
            <div className="container mt-5">

                <div className="card rounded-4 p-4">
                    <h1 className="d-flex justify-content-center">Ordine confermato!</h1>
                    <span className="fw-medium d-flex justify-content-center m-3">Dati di fatturazione</span>
                    <ul className="list-unstyled">
                        <li><span className="fw-semibold">Cliente:</span> {data.user_full_name}</li>
                        <li><span className="fw-semibold">Email:</span> {data.email}</li>
                        <li><span className="fw-semibold">Telefono:</span> {data.phone_number}</li>
                        <li><span className="fw-semibold">Paese:</span> {data.country}</li>
                        <li><span className="fw-semibold">Indirizzo:</span> {data.address}, {data.zipcode}, {data.city}</li>
                    </ul>
                    <hr />
                    <span className="fw-medium d-flex justify-content-center m-3">Dati dell'ordine</span>
                    <ul className="list-unstyled">
                        <li><span className="fw-semibold">Codice Ordine:</span> {data.order_code}</li>
                        <li><span className="fw-semibold">Data:</span> {new Date(data.created_at).toLocaleDateString("it-IT", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                        })}</li>
                        <li><span className="fw-semibold">Totale:</span> {data.total}€</li>
                        <li><span className="fw-semibold">Stato:</span> {data.status}</li>
                    </ul>
                    <hr />
                    <div className="d-flex justify-content-center align-items-center m-3">
                        <Link to="/">
                            <button className="btn btn-dark rounded-pill border-0 btn_cart"><i class="bi bi-arrow-left-short"></i>Torna alla Home</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}