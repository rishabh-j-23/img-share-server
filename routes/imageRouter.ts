import express, { Request, Response } from 'express';
import { isAuthenticated } from '../middlewares/user'
import { createImage, getImageById, getImageByUsername, getImages } from '../views/image';
import Image from '../models/imageModel';
import User from '../models/userModel';
const imageRouter = express.Router();

imageRouter.route('/images')
    .get(async (req: express.Request, res: express.Response) => {
        const allImages = await Image.find({})
            .select(['postName', 'uploadedBy', 'description', 'updatedAt', 'createdAt'])
            .sort({ createdAt: -1 })
            .exec();
        res.status(200).json(allImages);
    });

imageRouter.route('/image/upload')
    .post(isAuthenticated, async (req: express.Request, res: express.Response) => {
        const { imageData, uploadedBy, postName, username, description } = req.body;

        // Check if the required fields are provided
        if (!postName) {
            return res.status(400).json({ error: 'Missing post name field' });
        }
        if (!uploadedBy) {
            return res.status(400).json({ error: 'Missing user field' });
        }
        if (!imageData) {
            return res.status(400).json({ error: 'Missing image field' });
        }

        try {
            const image = new Image({ postName: postName, uploadedBy: uploadedBy, imageData: imageData, username: username, description: description });
            image.populate('uploadedBy');
            await image.save();

            await User.findByIdAndUpdate(uploadedBy, { $push: { sharedImages: image._id } });

            res.status(201).json(image.toObject());
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    })

imageRouter.route('/image/user')
    .get(isAuthenticated, async (req: Request, res: Response) => {
        const { username } = req.query;
        const imagesByUser = await Image.find({ username: username }).sort({ createdAt: -1 });
        return res.status(200).json(imagesByUser);
    })

imageRouter.route('/image/search')
    .get(async (req: express.Request, res: express.Response) => {
        try {
            const { searchPost } = req.query;

            const resultImages = await Image.find({ postName: { $regex: searchPost } });

            return res.status(200).json(resultImages);
        } catch (error) {
            console.log(error);
            return res.status(404).json(error);
        }
    });


imageRouter.route('/image/id')
    .get(async (req: express.Request, res: express.Response) => {
        try {
            const { id } = req.query;
            const image = await getImageById(id as string);
            return res.status(200).json(image);
        } catch (error) {
            return res.status(400).json({ error: "image not found" });
        }
    })
export default imageRouter;
