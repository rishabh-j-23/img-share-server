import express from 'express';
import { isAuthenticated } from '../middlewares/user'
import { createImage, getImages } from '../actions/imageAction';
const imageRouter = express.Router();

imageRouter.route('/images')
    .get(isAuthenticated, getImages)

imageRouter.route('/image/upload')
    .post(createImage)

export default imageRouter;
    