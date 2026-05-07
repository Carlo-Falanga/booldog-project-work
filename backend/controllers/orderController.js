const connection = require("../data/db")

// show - mostra un ordine con i suoi prodotti
const show = (req, res) => {

    const { id } = req.params

    const orderSql = `SELECT * FROM orders WHERE id = ?`

    connection.query(orderSql, [id], (err, orderResults) => {

        if (err) return res.status(500).json({
            error: true,
            message: "Database error"
        })

        if (orderResults.length === 0) {
            return res.status(404).json({ error: "Ordine non trovato" })
        }

        const order = orderResults[0]

        // prendo i prodotti collegati all'ordine
        const itemsSql = `
            SELECT p.id, p.name, p.slug, p.price, p.img_url, op.quantity
            FROM order_product op
            JOIN products p ON p.id = op.product_id
            WHERE op.order_id = ?
        `

        connection.query(itemsSql, [id], (err, itemsResults) => {

            if (err) return res.status(500).json({
                error: true,
                message: "Database error"
            })

            res.json({
                ...order,
                items: itemsResults
            })
        })
    })
}

// store - crea un nuovo ordine partendo dal carrello (localStorage)
const store = (req, res) => {

    const {
        user_full_name,
        email,
        phone_number,
        address,
        zipcode,
        city,
        country,
        products,      
        coupon_code    
    } = req.body

    // controlli base
    if (!user_full_name || !email || !address || !zipcode || !city || !country) {
        return res.status(400).json({ error: "Dati mancanti" })
    }

    if (!products || products.length === 0) {
        return res.status(400).json({ error: "Carrello vuoto" })
    }

    // prendo i prodotti dal db
    const productIds = products.map(p => p.id)
    const productSql = `SELECT id, price FROM products WHERE id IN (?)`

    connection.query(productSql, [productIds], (err, productResults) => {

        if (err) return res.status(500).json({
            error: true,
            message: "Database error"
        })

        if (productResults.length === 0) {
            return res.status(404).json({ error: "Prodotti non trovati" })
        }

        // calcolo il totale del carrello
        let total = 0
        for (let i = 0; i < products.length; i++) {
            const cartItem = products[i]
            const dbProduct = productResults.find(p => p.id === cartItem.id)
            if (dbProduct) {
                total += parseFloat(dbProduct.price) * cartItem.quantity
            }
        }

        // se c'e' un coupon lo controllo e applico lo sconto
        if (coupon_code) {

            const couponSql = `SELECT * FROM coupons WHERE code = ?`

            connection.query(couponSql, [coupon_code], (err, couponResults) => {

                if (err) return res.status(500).json({
                    error: true,
                    message: "Database error"
                })

                if (couponResults.length === 0) {
                    return res.status(404).json({ error: "Coupon non trovato" })
                }

                const coupon = couponResults[0]
                const now = new Date().getTime()
                const validFrom = new Date(coupon.valid_from).getTime()
                const validTo = new Date(coupon.valid_to).getTime()

                // controllo date
                if (now < validFrom || now > validTo) {
                    return res.status(400).json({ error: "Coupon scaduto o non ancora attivo" })
                }

                // controllo totale minimo
                if (coupon.min_cart_amount !== null && total < coupon.min_cart_amount) {
                    return res.status(400).json({ error: "Totale minimo non raggiunto" })
                }

                // applico lo sconto
                total = Math.max(0, total - parseFloat(coupon.value))

                insertOrder(coupon.id, total)
            })
        } else {
            insertOrder(null, total)
        }

        // funzione interna che salva l'ordine e i suoi prodotti
        function insertOrder(coupon_id, finalTotal) {

            // genero un codice ordine semplice
            const order_code = `BD-${Date.now()}`

            const insertOrderSql = `
                INSERT INTO orders
                (coupon_id, order_code, user_full_name, email, phone_number, address, zipcode, city, country, total)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `

            const orderValues = [
                coupon_id,
                order_code,
                user_full_name,
                email,
                phone_number || null,
                address,
                zipcode,
                city,
                country,
                finalTotal
            ]

            connection.query(insertOrderSql, orderValues, (err, results) => {

                if (err) return res.status(500).json({
                    error: true,
                    message: "Database error"
                })

                const order_id = results.insertId

                // inserisco i prodotti dell'ordine in order_product
                const itemsValues = products.map(p => [order_id, p.id, p.quantity])
                const itemsSql = `INSERT INTO order_product (order_id, product_id, quantity) VALUES ?`

                connection.query(itemsSql, [itemsValues], (err) => {

                    if (err) return res.status(500).json({
                        error: true,
                        message: "Database error"
                    })

                    res.status(201).json({
                        message: "Ordine creato",
                        order_id,
                        order_code,
                        total: finalTotal
                    })
                })
            })
        }
    })
}

module.exports = { show, store }
