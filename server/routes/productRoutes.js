const productRoute = require('express').Router();
const ProductController = require('../controller');
const {upload} = require('../middleware/configUpload');

productRoute.get('/', ProductController.getProduct);
productRoute.get('/detail/:id',ProductController.detail)
productRoute.get('/search',ProductController.search);
productRoute.post('/create',upload, ProductController.createProduct);
productRoute.put('/update/:id',upload, ProductController.updateProduct);
productRoute.delete('/delete/:id', ProductController.deleteProduct);

module.exports = productRoute;