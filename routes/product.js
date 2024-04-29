const express = require('express');
const productController = require('../controller/product');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);
router.post('/', productController.createProduct);
router.put('/:id', productController.replaceProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

exports.router = router;