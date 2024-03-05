import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors';

import apiRoutes from './routes/index';
import config from "./config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: '*'
}));
app.use('/', apiRoutes);

app.listen(config.serverPort, async () => {
    console.log(`------------------------------------------`);
    console.log(`Express is listening at http://localhost:${config.serverPort}`);
    console.log(`------------------------------------------`);
});
