import express from 'express';
import ProductManager from '../productManager.js'
import __dirname from '../../utils.js';

const pm=new ProductManager(__dirname+'../bbdd.json')
const router = express.Router();
const app = express();

router.get('/', (req, res) => {
    const productos= pm.getProductsView()
    res.render('index', {productos});
});

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', {});
});

export default router;