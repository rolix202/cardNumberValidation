import express, {Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Welcome to the Card Number Validation API!' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port ' + (process.env.PORT || 3000));
});