import uploader from "../../utils.js";
import express from 'express';
import ProductManager from "../ProductManager.js";
import { engine } from 'express-handlebars';


const app = express();
const productMngr = new ProductManager("../bbdd.json");

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/realTimeProducts', async (req, res) => {
    try {
        const productos = await productMngr.getProducts();
        res.render('home', { productos, length: productos.length > 0 });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        let products = await productMngr.getProducts();
        if (!isNaN(limit) && limit > 0) {
            products = products.slice(0, limit);
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.get('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const producto = await productMngr.getProductById(pid);
        res.json(producto);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/', uploader.single('file'), async (req, res) => {
    try {
        await productMngr.addProduct(req.body.code, req.body.title, req.body.description, req.body.price, (req.file ? [req.file.filename] : []), req.body.stock, req.body.category);
        res.send("Producto agregado con éxito...");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.put('/:pid', async (req, res) => {
    try {
        await productMngr.updateProduct(parseInt(req.params.pid), req.body.obj, req.body.campo, req.body.valor);
        res.send("Producto actualizado con éxito...");
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        await productMngr.deleteProduct(parseInt(req.params.pid));
        res.send("Producto eliminado con éxito...");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
