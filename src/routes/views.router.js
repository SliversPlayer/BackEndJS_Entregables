import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import __dirname from '../../utils.js';

const router = express.Router();
const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'handlebars');

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', {});
});

export default router;