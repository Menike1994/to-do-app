import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { signInUser, signUpUser } from '../services/authService';

const authRouter = express.Router();

authRouter.post('/api/auth/signin', async (req: Request, res: Response) => {
    try {
        const user: User = req.body;
        const result = await signInUser(user);
        res.send({ token: result });
    } catch (error) {
        console.log("something went wrong when signing in");
        res.statusCode = 400;
        res.send({ code: error, message: error });
    }
})

authRouter.post('/api/auth/signup', async (req: Request, res: Response) => {
    try {
        const user: User = req.body;
        const result = await signUpUser(user);
        res.send({ token: result });
    } catch (error) {
        console.log("something went wrong when signing up ", error);
        res.statusCode = 400;
        res.send({ code: error, message: error });
    }
})

export default authRouter;