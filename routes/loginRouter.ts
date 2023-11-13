import express, { Request, Response } from 'express';
import { login } from '../authenticate';
import bodyParser from 'body-parser';
import { getUserBySessionToken } from '../views/user';

const loginRouter = express.Router();
loginRouter.use(bodyParser.json());

loginRouter.route('/auth/login').post(login);

loginRouter.route('/auth/session').post(async (req: express.Request, res: express.Response) => {

    const { sessionToken } = req.params;
    const user = await getUserBySessionToken(sessionToken);

    if (user) {
        return res.status(200).json(user);
    } else {
        return res.status(400).json({ error: "user login error", ERR_CODE: 4001 });
    }

});

export default loginRouter;