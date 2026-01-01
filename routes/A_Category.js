const express = require('express');
const upload = require('../middlewares/multer');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { createCategory, deleteCategory, allCategory, toggleHideCategory } = require('../controllers/category');
const router = express.Router();

router.post('/create' , isLoggedIn ,upload.single('image'),  createCategory);
router.delete('/delete/:id', isLoggedIn,  deleteCategory);
router.get('/all', isLoggedIn,  allCategory);
router.put('/hide/:id', isLoggedIn,  toggleHideCategory);

module.exports = router;
