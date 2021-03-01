import studyRemoteLoginSource from "../lib/features/auth/data/StudyRemoteLoginSource";

describe('StudyRemoteLoginSource#tryLogin', () => {
   it('should fail with wrong account', async () => {
       const result = await studyRemoteLoginSource.tryLogin('202099999', 'haha');

       expect(result).toBe(false);
   });
});
