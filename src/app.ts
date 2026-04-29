import express, {Request, Response} from 'express';
import path from 'path';
import notFound from './middleware/notFound';
import errorHandler from './middleware/errorHandler';
import cardRoutes from './routes/card.routes';


const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/v1/card', cardRoutes)

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use(notFound)
app.use(errorHandler)

export default app;