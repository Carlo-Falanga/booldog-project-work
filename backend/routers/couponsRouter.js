const express = require('express')
const router = express.Router()


//show
router.get("/",(req, res) => {
  res.send('Hello i am coupon!')
})