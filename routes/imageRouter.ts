import express, { Request, Response } from 'express';
import { isAuthenticated } from '../middlewares/user'
import { createImage, getImageByUsername, getImages } from '../actions/imageAction';
import Image from '../models/imageModel';
import { getUserBySessionToken, getUserByUsername } from '../actions/userAction';
const imageRouter = express.Router();

imageRouter.route('/images')
    .get(async (req: express.Request, res: express.Response) => {
        const allImages = await Image.find({}).populate('uploadedBy').exec();
        res.status(200).json(allImages);
    })

imageRouter.route('/image/upload')
    .post(async (req: express.Request, res: express.Response) => {
        const { imageData, uploadedBy, postName, username } = req.body;

        // Check if the required fields are provided
        if (!postName) {
            return res.status(400).json({ error: 'Missing imagename fields' });
        }
        if (!uploadedBy) {
            return res.status(400).json({ error: 'Missing user fields' });
        }
        if (!imageData) {
            return res.status(400).json({ error: 'Missing image fields' });
        }

        try {
            const image = new Image({ postName: postName, uploadedBy: uploadedBy, imageData: imageData, username: username });
            image.populate('uploadedBy');
            await image.save();
            res.status(201).json(image.toObject());
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    })

imageRouter.route('/image/user')
    .get(async (req: Request, res: Response) => {
        const { username } = req.query;
        const imagesByUser = await Image.find({username: username });
        return res.status(200).json(imagesByUser);
    })
export default imageRouter;
