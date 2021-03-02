import array from "../../../utils/array";
import assertions from "../../../utils/assertions";
import RemoteLoginSource from "./RemoteLoginSource"
import lmsRemoteLoginSource from "./LmsRemoteLoginSource";
import studyRemoteLoginSource from "./StudyRemoteLoginSource";
import logger from "../../../logging/logger";

class UserRepository {
    constructor(private readonly remotes: RemoteLoginSource[]) {
        assertions.arrayShouldNotBeEmpty(remotes);

        this.remotes = remotes;
    }

    /**
     * 주어진 학번과 비밀번호로 학교 시스템에 로그인할 수 있는지 확인합니다.
     * @param id
     * @param password
     */
    async checkIfUserHasValidUnivAccount(id: string, password: string): Promise<boolean> {
        logger.verbose(`${id}씨가 포탈에 로그인할 수 있는지 확인합니다.`);

        const loginSource = this.pickLoginSource();
        const result = await loginSource.tryLogin(id, password);

        if (result) {
            logger.verbose(`${id}씨 계정으로 포탈에 로그인하는 데에 성공했습니다.`);
        } else {
            logger.verbose(`${id}씨 계정으로는 포탈에 로그인할 수 없습니다.`);
        }

        return result;
    }

    /**
     * 모든 로그인 요청을 한 군데에만 보내면 트래픽 부담이 있을 것 같아 여러 소스로 돌립니다.
     * @private
     */
    private pickLoginSource(): RemoteLoginSource {
        const picked = array.randomPick(this.remotes);

        logger.debug(`원격 로그인 소스 중 ${picked.constructor.name}를 사용합니다.`);

        return array.randomPick(this.remotes);
    }
}

const userRepository = new UserRepository([
    lmsRemoteLoginSource,
    studyRemoteLoginSource
    // 포털은 API 엿같애서 안해요!
]);

export default userRepository;
