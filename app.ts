import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from "dotenv";

import registerRouter from './routes/registerRouter'
import loginRouter from './routes/loginRouter'
import userRouter from './routes/userRouter'
import imageRouter from './routes/imageRouter'

dotenv.config();

const app = express();

app.use(cors({
    credentials: true
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
app.use(compression());
app.use((req: express.Request, res: express.Response, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    const allowedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    if (!allowedMethods.includes(req.method))
        throw new Error('Method not allowed.')
    next()
})

app.use('/', registerRouter);
app.use('/', loginRouter);
app.use('/', userRouter);
app.use('/', imageRouter);

const server = http.createServer(app);

const MONGO_URL: string = process.env.MONGO_URL.toString();

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL).then(async (res) => {
    await console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

server.listen(8080, () => {
    console.log("Local Server running on http://localhost:8080/");
});

app.route('/').get((req, res, next) => {
    res.send('Express server');
});

const newLocal: number = parseInt(process.env.PORT) || 3000;
app.listen(newLocal, "0.0.0.0", function () {
    console.log("backend running");
});