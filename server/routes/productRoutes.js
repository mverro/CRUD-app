const productRoute = require('express').Router();
const ProductController = require('../controller');
const {upload} = require('../middleware/configUpload');

productRoute.get('/', ProductController.getProduct);
productRoute.get('/detail/:id',ProductController.detail)
productRoute.get('/search',ProductController.search);
productRoute.post('/create',upload, ProductController.createProduct);
// productRoute.post('/create', ProductController.createProduct); // non uploading serverless
productRoute.put('/update/:id',upload, ProductController.updateProduct);
// productRoute.put('/update/:id', ProductController.updateProduct); // non uploading serverless
productRoute.delete('/delete/:id', ProductController.deleteProduct);
productRoute.get('/pagination', ProductController.getProductsPagination);

module.exports = productRoute;