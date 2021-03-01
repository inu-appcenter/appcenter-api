import lmsRemoteLoginSource from "../lib/features/auth/data/LmsRemoteLoginSource";

describe('LmsRemoteLoginSource#tryLogin', () => {
   it('should fail with wrong account', async () => {
       const result = await lmsRemoteLoginSource.tryLogin('202099999', 'haha');

       expect(result).toBe(false);
   });
});
