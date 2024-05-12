import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import http from 'http';
import viewsRouter from '../src/routes/views.router.js';
import { Server } from 'socket.io';
import __dirname from '../utils.js';


// Instancia de Express y del servidor HTTP
const app = express();
const server = http.createServer(app);

// Configura el servidor de Socket.IO
const socketServer = new Server(server);

const PORT = 8080;

// Middleware para manejar JSON
app.use(express.json());

// Middleware para analizador datos de formularios URL-encoded
app.use(express.urlencoded({ extended: true }));

//Inicializar motor usando app.engine
app.engine('handlebars', handlebars.engine());
app.set('view engine','handlebars');
app.set('views', __dirname+'/src/views');

// Server archivos estáticos
app.use('/', viewsRouter);
app.use(express.static(__dirname + '/public'));

// Rutas para manejar productos
import productsRouter from './routes/products.js';
app.use('/api/products', productsRouter);

// Rutas para manejar carritos
import cartsRouter from './routes/carts.js';
app.use('/api/carts', cartsRouter);

// Escuchar eventos de conexión de Socket.IO
socketServer.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
    
    // Lógica para emitir los productos al cliente cuando se conecta
    socket.emit('products', manager.getProducts());

    // Manejar evento para agregar un nuevo producto
    socket.on('addProduct', (product) => {
        manager.addProduct(product.title, product.description, product.price, product.thumbnail, product.code, product.stock);
        socketServer.emit('products', manager.getProducts());
    });

    // Manejar evento para eliminar un producto
    socket.on('deleteProduct', (productId) => {
        manager.deleteProduct(productId);
        socketServer.emit('products', manager.getProducts());
    });
});

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});