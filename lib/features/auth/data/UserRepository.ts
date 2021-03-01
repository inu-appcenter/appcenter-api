import lmsRemoteLoginSource from "./LmsRemoteLoginSource";
import studyRemoteLoginSource from "./StudyRemoteLoginSource";

class UserRepository {
    remotes: RemoteLoginSource[];

    constructor({remotes}: {remotes: RemoteLoginSource[]}) {
        this.remotes = remotes;
    }

    /**
     * 주어진 학번과 비밀번호로 학교 시스템에 로그인할 수 있는지 확인합니다.
     * @param id
     * @param password
     */
    async checkIfUserHasValidUnivAccount(id: string, password: string): Promise<boolean> {
        const loginSource = this.pickLoginSource();

        return loginSource.tryLogin(id, password);
    }

    /**
     * 모든 로그인 요청을 한 군데에만 보내면 트래픽 부담이 있을 것 같아 여러 소스로 돌립니다.
     * @private
     */
    private pickLoginSource(): RemoteLoginSource {
        return this.remotes[0];
    }
}

const userRepository = new UserRepository({
    remotes: [
        lmsRemoteLoginSource,
        studyRemoteLoginSource
        // 포털은 API 엿같애서 안해요!
    ]
});

export default userRepository;
