const express = require('express');
const productManager = require('./src/PreEntrega1.js');
const cartManager = require('./src/PreEntrega1_cart.js');

const app = express();
const PORT = 8080;

// Middleware para manejar JSON
app.use(express.json());

// Rutas para manejar productos
const productsRouter = require('./routes/products');
app.use('/api/products', productsRouter);

// Rutas para manejar carritos
const cartsRouter = require('./routes/carts.js');
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});