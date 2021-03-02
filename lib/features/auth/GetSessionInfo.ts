import tokenManager from "./data/TokenManager";
import config from "../../../config";
import logger from "../../logging/logger";

type SessionInfo = {
    id: string,
    issuedAt: number,
    expiresAt: number
};

function extractSessionInfoFromTokenPayload(payload: any): SessionInfo | undefined {
    logger.verbose(`토큰의 페이로드를 추출합니다.`);

    const {id, iat, exp} = payload;

    if (!id || !iat || !exp) {
        return undefined;
    }

    return {
        id: id,
        issuedAt: iat,
        expiresAt: exp
    };
}

function verifyTokenAndExtractPayload(token: string): any | undefined {
    logger.info(`토큰을 검증합니다.`);

    const payload = tokenManager.verifyToken(token, config.token.secret);
    if (!payload) {
        logger.info(`토큰이 올바르지 않습니다.`);

        return undefined;
    }

    logger.info(`토큰이 검증되었습니다.`);

    return extractSessionInfoFromTokenPayload(payload);
}

export default {
    /**
     * 주어진 토큰을 기반으로 현재 로그인 세션(세션 기반은 아니지만..)의 정보를 가져옵니다.
     * @param token 검증하고 페이로드를 뽑을 토큰
     */
    run(token: string): SessionInfo | undefined {
        logger.debug(`GetSessionInfo 유스케이스 시작합니다.`);

        return verifyTokenAndExtractPayload(token);
    }
}
