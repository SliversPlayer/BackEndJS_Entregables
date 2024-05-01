import express from 'express';
import handlebars from 'express-handlebars'
import http from 'http';
import { Server } from 'socket.io';
import productManager from './PreEntrega1.js';
import cartManager from './PreEntrega1_cart.js';
import __dirname from '../utils.js';
import path from 'path';

// Instancia de Express y del servidor HTTP
const app = express();
const server = http.createServer(app);

// Configura el servidor de Socket.IO
const io = new Server(server);

const PORT = 8080;

//Inicializar motor usando app.engine
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'views');
app.set('views engine','handlebars');


// Middleware para manejar JSON
app.use(express.json());

// Middleware para analizador datos de formularios URL-encoded
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.resolve(__dirname, 'src')));

// Rutas para manejar productos
import productsRouter from './routes/products.js';
app.use('/api/products', productsRouter);

// Rutas para manejar carritos
import cartsRouter from './routes/carts.js';
app.use('/api/carts', cartsRouter);

// Escuchar eventos de conexión de Socket.IO
io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
    
    // Lógica para emitir los productos al cliente cuando se conecta
    socket.emit('products', manager.getProducts());

    // Manejar evento para agregar un nuevo producto
    socket.on('addProduct', (product) => {
        manager.addProduct(product.title, product.description, product.price, product.thumbnail, product.code, product.stock);
        io.emit('products', manager.getProducts());
    });

    // Manejar evento para eliminar un producto
    socket.on('deleteProduct', (productId) => {
        manager.deleteProduct(productId);
        io.emit('products', manager.getProducts());
    });
});

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});