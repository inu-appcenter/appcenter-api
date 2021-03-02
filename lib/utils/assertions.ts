export default {
    atLeastOneMustBeTruthy(...args: any[]) {
        for (const arg of args) {
            if (arg) {
                return;
            }
        }

        throw new Error('인자 중 하나는 truthy 해야 합니다!');
    },

    arrayShouldNotBeEmpty(array: any[]) {
        if (array.length === 0) {
            throw new Error('배열의 원소가 하나 이상 있어야 합니다!');
        }
    }
};
