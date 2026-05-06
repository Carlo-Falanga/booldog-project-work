const connection = require("../data/db")

const index = (req, res) => {
  
    const sql = "SELECT * FROM coupons"

    connection.query(sql, (err, results)=>{

        if (err) return res.status(500).json({
            error: true,
            message: "Database error"
        })
         
        res.json(results)
    })
}

module.exports = {index}