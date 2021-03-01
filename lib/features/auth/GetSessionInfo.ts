import tokenManager from "./data/TokenManager";
import config from "../../../config";

type SessionInfo = {
    id: string,
    issuedAt: number,
    expiresAt: number
};

function extractSessionInfoFromTokenPayload(payload: any): SessionInfo | undefined {
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

export default {
    /**
     * 주어진 토큰을 기반으로 현재 로그인 세션(세션 기반은 아니지만..)의 정보를 가져옵니다.
     * @param token 검증하고 페이로드를 뽑을 토큰
     */
    run(token: string): SessionInfo | undefined {
        const tokenVerified = tokenManager.verifyToken(token, config.token.secret);
        if (!tokenVerified) {
            return undefined;
        }

        return extractSessionInfoFromTokenPayload(tokenVerified);
    }
}
