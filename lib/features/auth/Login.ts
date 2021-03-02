import userRepository from "./data/UserRepository";
import tokenManager from "./data/TokenManager";
import config from "../../../config";
import logger from "../../logging/logger";

type Tokens = {
    accessToken: string,
    refreshToken: string
};

type LoginResult = Tokens;

async function loginByPassword(id: string, password: string): Promise<LoginResult | undefined> {
    logger.info(`${id}씨 학번과 비밀번호로 로그인합니다.`);

    const accountValid = await userRepository.checkIfUserHasValidUnivAccount(id, password);
    if (!accountValid) {
        logger.info(`${id}씨 로그인 실패합니다. 학번 또는 비밀번호를 점검해봐야겠습니다.`);

        return undefined;
    }

    logger.info(`${id}씨 로그인 성공합니다.`);

    return issueNewToken(id);
}

async function loginByRefreshToken(id: string, refreshToken: string): Promise<LoginResult | undefined> {
    logger.info(`${id}씨 학번과 refreshToken으로 로그인합니다.`);

    const tokenVerified = tokenManager.verifyToken(refreshToken, config.token.secret);
    if (!tokenVerified) {
        logger.info(`${id}씨 로그인 실패합니다. 가져온 refreshToken이 이상한가봅니다.`);

        return undefined;
    }

    if (tokenVerified['id'] !== id) {
        // 토큰은 유효한데 그 안에 들어 있는 id가 토큰과 안 맞는 경우입니다.
        // 다른 사용자의 토큰을 탈취한 경우를 의심할 수 있습니다.
        logger.warn(`어허 ${id}씨, ${tokenVerified['id']}씨의 토큰을 훔쳐오셨네요?`);

        return undefined;
    }

    logger.info(`${id}씨 로그인 성공합니다.`);

    return issueNewToken(id);
}

function issueNewToken(id: string): Tokens {
    logger.verbose(`${id}씨를 위한 accessToken과 refreshToken을 발급합니다.`);

    const payload = {id};

    return {
        accessToken: tokenManager.issueNewToken(payload, config.token.secret, config.token.accessTokenExpiresIn),
        refreshToken: tokenManager.issueNewToken(payload, config.token.secret, config.token.refreshTokenExpiresIn)
    }
}

export default {
    /**
     * 로그인하고 accessToken과 refreshToken을 가져옵니다.
     * id는 필수입니다. 비밀번호와 refreshToken은 둘 중 하나만 있으면 됩니다.
     *
     * @param id 학번
     * @param password 비밀번호
     * @param refreshToken 지난 로그인에서 응답으로 받은 refreshToken(있으면)
     */
    async run(id: string, password?: string, refreshToken?: string): Promise<LoginResult | undefined> {
        logger.debug(`Login 유스케이스 시작합니다.`);

        if (password) {
            // 비밀번호와 리프레시 토큰이 동시에 오면 비밀번호 우선입니다.
            return loginByPassword(id, password);
        }

        if (refreshToken) {
            return loginByRefreshToken(id, refreshToken);
        }

        // 위 두 경우 모두 아니면 파라미터가 부적절한 경우!
        return undefined;
    }
}
