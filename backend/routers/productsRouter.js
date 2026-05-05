const express = require('express')
const router = express.Router()
const productController = require("../controllers/productController")

//index
router.get("/", productController.index)

//show
router.get("/:id", productController.show)

module.exports = router