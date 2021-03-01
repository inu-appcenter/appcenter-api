import fetch from "node-fetch";
import config from "../../../../config";

/**
 * 이러닝
 */
class LmsRemoteLoginSource implements RemoteLoginSource {
    async tryLogin(id: string, password: string): Promise<boolean> {
        const params = new URLSearchParams();
        params.append('username', id);
        params.append('password', password);

        const response = await fetch(config.remoteLoginSource.lms, {
            method: 'POST',
            body: params,
            redirect: 'manual' // 리다이렉트 따라가면 안됨!!
        });

        const setCookieHeaders = response.headers.get('set-cookie');
        if (!setCookieHeaders) {
            return false;
        }

        // 로그인 성공시에만 MOODLEID1_ 쿠키가 설정됨!
        return setCookieHeaders.includes('MOODLEID1_');
    }
}

const lmsRemoteLoginSource = new LmsRemoteLoginSource();

export default lmsRemoteLoginSource;
