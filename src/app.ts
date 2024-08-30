import express from 'express';
import dotenv from 'dotenv';
import measureRoutes from './routes/measureRoutes';

dotenv.config();

const app = express();
app.use(express.json());

// Usar as rotas
app.use('/api/measures', measureRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
