import {Request, Response} from "express";
import Login from "./Login";
import GetSessionInfo from "./GetSessionInfo";
import logger from "../../logging/logger";

export default {
    async login(req: Request, res: Response) {
        logger.http(`로그인 요청을 수신했습니다.`);

        const {id, password, refreshToken} = req.body;

        if (!id) {
            res.status(400).json({
                message: 'id는 필수입니다!'
            });

            logger.http(`id 없는 로그인 요청이 들어왔네요. 기각!`);

            return;
        }

        if (!password && !refreshToken) {
            res.status(400).json({
                message: 'password 또는 refreshToken 중 하나는 필수입니다!'
            });

            logger.http(`password도 refreshToken도 없는 요청이 들어왔네요. 기각!`);

            return;
        }

        const result = await Login.run(id, password, refreshToken);

        if (!result) {
            res.status(401).json({
                message: '학번이나 비밀번호, 또는 refreshToken을 확인해 주세요!'
            });

            logger.http(`학번과 비밀번호가 맞지 않거나 가져온 refreshToken이 이상하네요. 기각!`);

            return;
        }

        logger.http(`${id}씨의 로그인 요청이 성공적으로 처리되었습니다.`);

        res.json(result);
    },

    async getSessionInfo(req: Request, res: Response) {
        logger.http(`토큰 조회 요청을 수신했습니다.`);

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(400).json({
                message: 'Authorization 헤더에 Bearer 토큰을 담아 요청해 주세요!'
            });

            logger.http(`Authorization 헤더가 없거나 Bearer 값이 없는 요청이 들어왔네요. 기각!`);

            return;
        }

        const token = authHeader.substring(7, authHeader.length);

        const result = await GetSessionInfo.run(token);

        if (!result) {
            res.status(401).json({
                message: '토큰이 올바르지 않습니다!'
            });

            logger.http(`가져온 토큰이 올바르지 않네요. 기각!`);

            return;
        }

        logger.http(`${result.id}씨의 토큰 조회 요청이 성공적으로 처리되었습니다.`);

        res.json(result);
    }
}
