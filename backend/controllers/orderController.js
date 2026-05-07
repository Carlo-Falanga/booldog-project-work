const connection = require("../data/db")

//show
const show = (req, res) => {
    const { id } = req.params

    const sql = `SELECT * FROM orders WHERE id=?`

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({
            error: true,
            message: "Database error"
        })

        if (results.length === 0) {
            return res.status(404).json({ error: "Ordine non trovato" });
        }

        res.json(results)
    })

}

//store
const store = (req, res) => {

    const {
        user_full_name,
        email,
        phone_number,
        address,
        zipcode,
        city,
        country
    } = req.body

    //id, coupon_id, total, status, created_at

    const coupon_code = req.body.coupon_code || null

    if (coupon_code) {
        const couponSql = `
        SELECT coupons.id 
        FROM coupons
        WHERE coupons.code = ?
        `
        connection.query(couponSql, [coupon_code], (err, results) => {

            if (err) return res.status(500).json({
                error: true,
                message: "Database error"
            })
            if (results.length === 0) {
                return res.status(404).json({ error: "Coupon non trovato" });
            }


            const coupon_id = results[0]

        })
    }



}

module.exports = { show, store }