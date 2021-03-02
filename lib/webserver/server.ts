import config from "../../config";
import express from 'express';
import authRouter from "./routes/auth";
import logger from "../logging/logger";

export default function startServer() {
    const app = express();
    logger.verbose('Express 앱 생성합니다.');

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    logger.verbose('Express 미들웨어 설정합니다.');

    app.use('/auth', authRouter);
    logger.verbose('Express 라우터 설정합니다.');

    app.listen(config.server.port);
    logger.info(`${config.server.port}번 포트에서 서버 시작합니다.`);
}
