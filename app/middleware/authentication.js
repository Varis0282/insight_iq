import userModel from '../models/users.js';
import UserModel from '../models/users.js';
import jwt from 'jsonwebtoken';

const secret = process.env.SECRET

export default async (req, res, next) => {
    const token = req.headers.authorisation.split('Bearer ')[1];
    if (!token) {
        res.json("Unauthorised")
        next()
    }
    const userId = jwt.verify(token, secret)
    if (!userId) {
        res.json("Unauthorised")
        next()
    }
    const user = await userModel.findById(userId)
    if (!user) {
        res.json("Unauthorised");
        next()
    }
    user.password = undefined;
    req.user = user
    next();
}