import express from 'express';
import ProductManager from '../ProductManager.js';

const productManager = new ProductManager();
const router = express.Router();

// Ruta para obtener todos los productos
router.get('/', (req, res) => {
    const limit = req.query.limit;
    if (limit) {
        const limitedProducts = productManager.getProducts().slice(0, limit);
        res.json(limitedProducts);
    } else {
        res.json(productManager.getProducts());
    }
});

// Ruta para obtener un producto por su ID
router.get('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductsById(productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

// Ruta para agregar un nuevo producto
router.post('/', (req, res) => {
    const { title, description, price, code, stock, category, thumbnails } = req.body;
    if (!title || !description || !price || !code || !stock || !category) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    productManager.addProduct(title, description, price, code, stock, category, thumbnails);
    res.status(201).json({ message: 'Producto agregado exitosamente' });
});

// Ruta para actualizar un producto por su ID
router.put('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const updatedFields = req.body;
    const success = productManager.updateProduct(productId, updatedFields);
    if (success) {
        res.json({ message: 'Producto actualizado exitosamente' });
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

// Ruta para eliminar un producto por su ID
router.delete('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const success = productManager.deleteProduct(productId);
    if (success) {
        res.json({ message: 'Producto eliminado exitosamente' });
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

export default router;