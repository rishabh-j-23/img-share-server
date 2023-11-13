import express from 'express'
import Image from '../models/imageModel';

async function getRecentPosts(req: express.Request, res: express.Response) {
    try {

        const { limit } = req.params;

        // Find the most recent 10 posts based on the createdAt field in descending order
        const recentPosts = await Image.find({})
            .sort({ createdAt: -1 }) // Sort by createdAt in descending order
            .limit(parseInt(limit));

        return res.status(200).json(recentPosts);
    } catch (error) {
        // Handle any errors that might occur during the database query
        console.error('Error fetching recent posts:', error);
        return res.sendStatus(400);

    }
}

async function getNextPosts(req: express.Request, res: express.Response) {
    try {
        const { skipCount, limit } = req.params;
        // Find the next 10 posts based on the createdAt field in descending order
        const nextPosts = await Image.find({})
            .sort({ createdAt: -1 }) // Sort by createdAt in descending order
            .skip(parseInt(skipCount)) // Skip the first n posts
            .limit(parseInt(limit)); 

        return res.status(200).json(nextPosts);
    } catch (error) {
        // Handle any errors that might occur during the database query
        console.error('Error fetching next posts:', error);
        return res.sendStatus(400);

    }
}
