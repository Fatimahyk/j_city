import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './SRC/DB/database.js';
import router from './SRC/routes/index.js';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({origin:'*'}));
app.use('/api/v1', router);


const startServer = async () => {
    const PORT = process.env.PORT
    connectDB()
    try {
        app.listen(PORT, () => {console.log(`J-CITY is running on http://localhost:${PORT}`)})
    } catch (error) {
        console.error(error.message);
    }
}
startServer()