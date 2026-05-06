const express = require('express')
const app = express()
const PORT = 3000
const productsRouter = require("./routers/productsRouter")
const couponsRouter = require("./routers/couponsRouter")
const serverError = require("./middlewares/serverError")
const notFound = require("./middlewares/notFound")
const cors = require("cors")

app.use(cors())

app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/products', productsRouter)

app.use('/coupons', couponsRouter)

app.use(notFound)

app.use(serverError)


app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
})

