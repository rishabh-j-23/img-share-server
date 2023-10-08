import express from 'express';
import bodyParser from 'body-parser';
import { getAllUsers, deleteUser, updateUser, getUserBySession } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares/user'

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.route('/users')
    .get(isAuthenticated, getAllUsers);

userRouter.route('/user')
    .get(getUserBySession);

userRouter.route('/users/:id')
    .delete(isAuthenticated, isOwner, deleteUser)
    .patch(isAuthenticated, isOwner, updateUser);

export default userRouter;