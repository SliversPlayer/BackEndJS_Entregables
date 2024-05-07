import express from 'express';
import CartManager from '../CartManager.js';
import ProductManager from "../ProductManager.js";


const router = express.Router();
const cartMngr = new CartManager('./cart_data.json');
const productMngr = new ProductManager('./bbdd.json');

router.post('/', async (req, res) => {
    try {
        await cartMngr.addCart();
        res.send("Carrito creado con éxito...");
    } catch (error) {
        res.status(500).send("ERROR: " + error.message);
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        if (!isNaN(cid) && cid > 0) {
            const products = await cartMngr.getCartByCid(cid);
            res.json(products);
        } else {
            throw new Error("El ID ingresado es incorrecto");
        }
    } catch (error) {
        res.status(500).send("ERROR: " + error.message);
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const product = await productMngr.getProductById(req.params.pid);
        if (product) {
            await cartMngr.addProduct(parseInt(req.params.cid), parseInt(req.params.pid));
            res.send("Producto agregado con éxito");
        } else {
            throw new Error("El ID del producto ingresado no existe");
        }
    } catch (error) {
        res.status(500).send("ERROR: " + error.message);
    }
});

export default router;