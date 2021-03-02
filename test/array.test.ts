import array from "../lib/utils/array";

describe('array#randomPick', () => {
    it('should return undefined when passed empty array', () => {
        const empty: any[] = [];
        const picked = array.randomPick(empty);

        expect(picked).toBe(undefined);
    });

   it('should return one of items in the array', () => {
       const arr = [1, 2, 3, 4];
       const picked = array.randomPick(arr);

       expect(arr.includes(picked)).toBe(true);
   });
});
