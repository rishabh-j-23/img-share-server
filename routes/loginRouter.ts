import express, { Request, Response } from 'express';
import { login } from '../authenticate';
import bodyParser from 'body-parser';

const loginRouter = express.Router();
loginRouter.use(bodyParser.json());

loginRouter.route('/auth/login').post(login);

export default loginRouter;