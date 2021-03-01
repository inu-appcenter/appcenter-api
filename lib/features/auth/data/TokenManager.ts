import jwt, {JsonWebTokenError} from 'jsonwebtoken';

class TokenManager {
    issueNewToken(payload: any, secret: string, expiresIn?: string | number): string {
        return jwt.sign(payload, secret, {expiresIn});
    }

    /**
     * 주어진 토큰을 비밀 키로 검증합니다.
     * 토큰이 올바르면 페이로드를, 그렇지 않으면 undefined를 반환합니다.
     *
     * @param token 검증할 토큰
     * @param secret 토큰을 서명한 비밀 키
     */
    verifyToken(token: string, secret: string): any | undefined {
        try {
            return jwt.verify(token, secret);
        } catch (e) {
            return undefined;
        }
    }
}

const tokenManager = new TokenManager();

export default tokenManager;
