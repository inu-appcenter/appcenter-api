import express from 'express';
import authRouter from "./routes/auth";

export default function startServer() {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use('/auth', authRouter);
}
