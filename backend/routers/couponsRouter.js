const express = require('express')
const router = express.Router()
const couponController = require("../controllers/couponController")


//show
router.get("/",couponController.index)

module.exports = router