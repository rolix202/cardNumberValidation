import express, {Request, Response} from 'express';
import notFound from './middleware/notFound';
import errorHandler from './middleware/errorHandler';
import AppError from './errors/AppError';
const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Welcome to the Card Number Validation API!' });
});

// test operational error
app.get('/test-error', (req, res, next) => {
  next(new AppError('This is a test error', 400));
});

// test unknown crash
app.get('/test-crash', (req, res, next) => {
  throw new Error('Unexpected crash');
});

// test 404 — just hit any route that doesn't exist
// e.g. GET /doesnotexist


app.use(notFound)
app.use(errorHandler)

export default app;