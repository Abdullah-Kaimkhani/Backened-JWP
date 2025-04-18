import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './router/routes.js';
import { connectDB } from './database/database.js';


const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use('/routes', router);
connectDB();





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
