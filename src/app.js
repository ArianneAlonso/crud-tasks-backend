import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import taskRouter from './routers/routers.js';

const app = express();

// middleware cors
app.use(cors());
// middleware logging de solicitudes HTTP
app.use(morgan('dev'));
// middleware manejo datos en formato JSON
app.use(express.json());

// rutas 
app.use('/api', taskRouter);
app.get('/', (req, res) => {
    res.send('servidor funcionando');
});

// middleware manejo rutas no encontradas (404)
app.use((req, res, next) => {
    res.status(404).json({ error: 'ruta no encontrada' });
});

// middleware manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'error en el servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
