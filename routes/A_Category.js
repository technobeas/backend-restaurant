const express = require('express');
const upload = require('../middlewares/multer');
const { createCategory, deleteCategory, allCategory, toggleHideCategory } = require('../controllers/category');
const router = express.Router();

router.post('/create'  ,upload.single('image'),  createCategory);
router.delete('/delete/:id',  deleteCategory);
router.get('/all',  allCategory);
router.put('/hide/:id',  toggleHideCategory);

module.exports = router;
