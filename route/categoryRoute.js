const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');
const { verifyAccessToken } = require('../middleware/helpers');


router.post('/create', verifyAccessToken, categoryController.createCategory);
router.get('/all', categoryController.getAllCategories);
router.get('/:id', categoryController.getSingleCategory);
router.put('/update/:id', verifyAccessToken, categoryController.updateCategory);
router.delete('/delete/:id', verifyAccessToken, categoryController.deleteCategory);

module.exports = router;
