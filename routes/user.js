const express = require('express');
const { allProducts } = require('../controllers/product');
const { allCategory } = require('../controllers/category');
const router = express.Router();


router.get('/allProduct',  allProducts);
router.get('/allCategory' , allCategory );

// to keep live server after 5min every
router.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});


module.exports = router;
