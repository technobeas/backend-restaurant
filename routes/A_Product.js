const express = require('express');
const { allProducts, createProduct, deleteProduct, toggleHideProduct, togglePopularProduct } = require('../controllers/product');
const upload = require('../middlewares/multer');
const router = express.Router();

router.post('/create'  , upload.single('image'),  createProduct);
router.delete('/delete/:id',  deleteProduct);
router.get('/all',  allProducts);
router.put('/hide/:id',  toggleHideProduct);
router.put('/popular/:id',  togglePopularProduct);



module.exports = router;
