import fetch from 'node-fetch';
import config from "../../../../config";

/**
 * 비교과스터디
 */
class StudyRemoteLoginSource implements RemoteLoginSource {
    async tryLogin(id: string, password: string): Promise<boolean> {
        const params = new URLSearchParams();
        params.append('log', id);
        params.append('pwd', password);

        const response = await fetch(config.remoteLoginSource.study, {
            method: 'POST',
            body: params,
            redirect: 'manual' // 리다이렉트 따라가면 안됨!!
        });

        const setCookieHeaders = response.headers.get('set-cookie');
        if (!setCookieHeaders) {
            return false;
        }

        // 로그인 성공시에만 wordpress_logged_in_* 쿠키가 설정됨!
        return setCookieHeaders.includes('wordpress_logged_in_');
    }
}

const studyRemoteLoginSource = new StudyRemoteLoginSource();

export default studyRemoteLoginSource;
