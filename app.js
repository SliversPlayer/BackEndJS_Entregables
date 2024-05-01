import express from 'express';
import handlebars from 'express-handlebars'
import productManager from './src/PreEntrega1.js';
import cartManager from './src/PreEntrega1_cart.js';
import __dirname from './utils.js'

const app = express();
const PORT = 8080;

//Inicializar motor usando app.engine
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'views');

app.set('views engine','handlebars');

// Middleware para manejar JSON
app.use(express.json());

// Rutas para manejar productos
import productsRouter from './routes/products.js';
app.use('/api/products', productsRouter);

// Rutas para manejar carritos
import cartsRouter from './routes/carts.js';
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});