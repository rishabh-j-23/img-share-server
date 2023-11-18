import express from 'express';
import bodyParser from 'body-parser';
import { getAllUsers, deleteUser, updateUser, getUserBySession } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares/user'
import User from '../models/userModel';

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.route('/users')
    .get(isAuthenticated, getAllUsers);

userRouter.route('/user')
    .get(isAuthenticated, getUserBySession);

userRouter.get('/user/posts', async (req, res) => {

    const { username } = req.body;

    const user = await (await User.findOne({ username: username })).populate('sharedImages');

    res.send(user.sharedImages);
});

export default userRouter;