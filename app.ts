import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

import registerRouter from './routes/registerRouter'
import loginRouter from './routes/loginRouter'
import userRouter from './routes/userRouter'
import imageRouter from './routes/imageRouter'

const app = express();

app.use(cors({
    credentials: true
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cookieParser());
app.use(compression());


app.use('/', registerRouter);
app.use('/', loginRouter);
app.use('/', userRouter);
app.use('/', imageRouter);

// const server = http.createServer(app);

const MONGO_URL = 'mongodb+srv://rishabh:C6jvTT6DJtubGXmf@cluster0.agb8tws.mongodb.net/'
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL).then(async (res) => {
    await console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

// server.listen(8080, () => {
//     console.log("Server running on http://localhost:8080/");
// });

app.route('/').get((req, res, next) => {
    res.send('Express server');
});

const newLocal: number = parseInt(process.env.PORT) || 3000;
app.listen(newLocal, "0.0.0.0", function () {
    console.log("backend running");
});