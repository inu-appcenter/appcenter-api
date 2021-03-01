import assertions from "../lib/utils/assertions";

describe('assertions#atLeastOneMustBeTruthy', () => {
   it('should throw when non of arguments are truthy', () => {
       expect(
           () => assertions.atLeastOneMustBeTruthy(undefined, undefined)
       ).toThrow();
   });

   it('should succeed if any of them are truthy', () => {
      assertions.atLeastOneMustBeTruthy(1, 2, undefined);
   });
});
