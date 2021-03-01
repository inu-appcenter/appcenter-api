export default {

    atLeastOneMustBeTruthy(...args: any[]) {
        for (const arg of args) {
            if (arg) {
                return;
            }
        }

        throw new Error('인자 중 하나는 truthy 해야 합니다!');
    }

};
