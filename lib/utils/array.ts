export default {
    randomPick(array: any[]): any {
        return array[Math.floor(Math.random() * array.length)];
    }
};
