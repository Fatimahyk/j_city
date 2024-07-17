import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './SRC/DB/database.js';
import router from './SRC/routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3690;

app.use(bodyParser.json());
app.use(cors());
app.use('/jcityTour', router);

app.listen(PORT, () => {
    connectDB();
    console.log(`Jcity is currently running on ${PORT}`);
});
