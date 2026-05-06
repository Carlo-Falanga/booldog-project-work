const express = require('express')
const app = express()
const PORT = 3000
const productsRouter = require("./routers/productsRouter")
const couponsRouter = require("./routers/couponsRouter")

app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/products', productsRouter)

app.use('/coupons', couponsRouter)

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
})

