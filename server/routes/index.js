const route = require('express').Router();
const productRoutes = require('./productRoutes');

route.use("/products",productRoutes);

module.exports = route;
