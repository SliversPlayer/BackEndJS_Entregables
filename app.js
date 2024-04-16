const express = require('express');
const productManager = require('./DesafioEntregable3.js');

const app = express();
const PORT = 3000

// Middleware para manejar JSON
app.use(express.json());

// Ruta para obtener todos los productos
app.get('/products', (req, res) => {
    const limit = req.query.limit;
    if (limit) {
        const limitedProducts = productManager.getProducts().slice(0, limit);
        res.json(limitedProducts);
    } else {
        res.json(productManager.getProducts());
    }
});

// Ruta para obtener un producto por su ID
app.get('/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductsById(productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});

