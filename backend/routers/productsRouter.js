const express = require('express')
const router = express.Router()
const productController = require("../controllers/productController")



//index
router.get("/", productController.index)

//show
router.get("/:slug", productController.show)

module.exports = router