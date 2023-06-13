const productRoute = require('express').Router();
const ProductController = require('../controller');
const uploadMulter = require('../middleware/configUpload');

productRoute.get('/', ProductController.getProduct);
productRoute.get('/detail/:id',ProductController.detail)
productRoute.get('/search',ProductController.search);
productRoute.post('/create',uploadMulter, ProductController.createProduct);
productRoute.put('/update/:id',uploadMulter, ProductController.updateProduct);
productRoute.delete('/delete/:id', ProductController.deleteProduct);
productRoute.get('/pagination', ProductController.getProductsPagination);

module.exports = productRoute;