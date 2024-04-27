import express from 'express';
import mysql from "mysql2"
import dotenv from "dotenv"
import taskRouter from './controllers/tasksController';
import authRouter from './controllers/authController';
import cors from 'cors';

const app = express();

app.use(express.json());
var corsOptions = {
    origin: 'http://localhost:5173',
}

app.use(cors(corsOptions))

app.use(taskRouter);
app.use(authRouter);
dotenv.config();

const PORT = 3000;

export const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB
}).promise();


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


