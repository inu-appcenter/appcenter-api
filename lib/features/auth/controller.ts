import {Request, Response} from "express";
import Login from "./Login";
import GetSessionInfo from "./GetSessionInfo";

export default {
    async login(req: Request, res: Response) {
        const {id, password, refreshToken} = req.body;

        if (!id) {
            res.status(400).json({
                message: 'id는 필수입니다!'
            });

            return;
        }

        if (!password && !refreshToken) {
            res.status(400).json({
                message: 'password 또는 refreshToken 중 하나는 필수입니다!'
            });

            return;
        }

        const result = Login.run(id, password, refreshToken);

        if (!result) {
            res.status(401).json({
                message: '학번이나 비밀번호, 또는 refreshToken을 확인해 주세요!'
            });

            return;
        }

        res.json(result);
    },

    async getSessionInfo(req: Request, res: Response) {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(400).json({
                message: 'Authorization 헤더에 Bearer 토큰을 담아 요청해 주세요!'
            });

            return;
        }

        const token = authHeader.substring(7, authHeader.length);

        const result = GetSessionInfo.run(token);

        if (!result) {
            res.status(401).json({
                message: '토큰이 올바르지 않습니다!'
            });

            return;
        }

        res.json(result);
    }
}
