
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

                <div className="d-flex justify-content-start mb-3">
                    <Link to="/">
                        <button className="btn btn-dark rounded-pill border-0 btn_cart"><i class="bi bi-arrow-left-short"></i>Torna alla Home</button>
                    </Link>
                </div>

                <div className="card rounded-4 p-4">
                    <h1 className="d-flex justify-content-center">Ordine confermato!</h1>
                    <span className="fw-medium d-flex justify-content-center m-3">Dati di fatturazione</span>
                    <ul className="list-unstyled">
                        <li>Cliente: {data.user_full_name}</li>
                        <li>Email : {data.email}</li>
                        <li>Telefono : {data.phone_number}</li>
                        <li>Paese : {data.country}</li>
                        <li>Indirizzo : {data.address}, {data.zipcode}, {data.city}</li>
                    </ul>
                    <hr />
                    <span className="fw-medium d-flex justify-content-center m-3">Dati dell'ordine</span>
                    <ul className="list-unstyled">
                        <li>Codice Ordine: {data.order_code}</li>
                        <li>Data : {data.created_at}</li>
                        <li>Totale : {data.total}€</li>
                        <li>Stato : {data.status}</li>
                    </ul>
                </div>
            </div>
        </>
    )
}