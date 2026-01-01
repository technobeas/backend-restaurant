const express = require('express');
const { allProducts, createProduct, deleteProduct, toggleHideProduct, togglePopularProduct } = require('../controllers/product');
const upload = require('../middlewares/multer');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const router = express.Router();

router.post('/create' , isLoggedIn , upload.single('image'),  createProduct);
router.delete('/delete/:id', isLoggedIn,  deleteProduct);
router.get('/all', isLoggedIn,  allProducts);
router.put('/hide/:id', isLoggedIn,  toggleHideProduct);
router.put('/popular/:id', isLoggedIn,  togglePopularProduct);



module.exports = router;
