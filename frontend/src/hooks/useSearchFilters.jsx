import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';


export function useSearchFilters(endpoint) {

    const [searchParams, setSearchParams] = useSearchParams();

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState(searchParams.get('search') || "");
    const [order, setOrder] = useState(searchParams.get('sort') || "");
    const [listView, setListView] = useState(false);

    const url = `http://localhost:3000/products/${endpoint}`

    //chiamata api per index dei prodotti
    useEffect(() => {
        axios.get(`${url}?sort=${order}&search=${search}`)
            .then(res => {
                setProducts(res.data);
            })
    }, [order, search, endpoint])


    function handleFilterChange(key, value) {
        //copio i parametri attuali dell'url
        const newParams = new URLSearchParams(searchParams);

        // modifico le variabili reattive 
        switch (key) {
            case 'sort':
                setOrder(value);
                break;
            case 'search':
                setSearch(value);
                break;
        }

        //modifico i parametri dell'url
        if (value) {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }

        setSearchParams(newParams);
    }

    return { products, search, order, handleFilterChange, listView, setListView };
}
