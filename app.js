import express from 'express';
import dbconfig from './dbconfig.js';
import dotenv from 'dotenv';
import cors from 'cors'
import user from './app/api/user.js';
dotenv.config();

const app = express()

app.use(express.json())
app.use(cors());
user(app);

app.get('/', (req, res) => {
    res.send("hey buddy");
})



app.listen('5000', () => {
    console.log("App running on 5000");
})