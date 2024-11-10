import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI

mongoose
    .connect(MONGO_URI)
    .then((res) => {
        console.log("DB connected");
    })
    .catch((err) => {
        console.log("Error occured", err)
    })


export default mongoose