import express from 'express';
import cartManager from '../CartManager.js';
import __dirname from "../../utils.js";
import ProductManager from "../ProductManager.js";


const router = express.Router();

// Ruta para crear un nuevo carrito
router.post('/', (req, res) => {
    const newCart = cartManager.createCart();
    res.status(201).json(newCart);
});

// Ruta para obtener los productos de un carrito por su ID
router.get('/:cid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = cartManager.getCartById(cartId);
    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).json({ message: 'Carrito no encontrado' });
    }
});

// Ruta para agregar un producto a un carrito por su ID
router.post('/:cid/product/:pid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const quantity = req.body.quantity || 1;

    const product = productManager.getProductsById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const success = cartManager.addProductToCart(cartId, productId, quantity);
    if (success) {
        res.json({ message: 'Producto agregado al carrito exitosamente' });
    } else {
        res.status(404).json({ message: 'Carrito no encontrado' });
    }
});

export default router;
const pm = new ProductManager(__dirname + '/');
