import app from "./app";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (err: Error) => {
    console.error('UNHANDLED RECJECTION:', err.message);
    server.close(() => process.exit(1));
})

process.on('uncaughtException', (err: Error) => {
    console.error('UNCAUGHT EXCEPTION:', err.message);
    server.close(() => process.exit(1));
})