import tokenManager from "../lib/features/auth/data/TokenManager";

describe('TokenManager#issueNewToken', () => {
    it('should not throw', () => {
        tokenManager.issueNewToken({name: 'john'}, 'hahahaha', '8h');
    });
});

describe('TokenManager#verifyToken', () => {
    it('should not throw', () => {
        tokenManager.verifyToken('token!', 'hahahaha');
    });

    it('should give undefined when verifying failed', () => {
        const token = tokenManager.verifyToken('something_that_is_not_a_token', 'hahahaha');

        expect(token).toBeUndefined();
    });

    it('should verify issued token', () => {
        const token = tokenManager.issueNewToken({name: 'john'}, 'hahahaha', '8h');

        const payload = tokenManager.verifyToken(token, 'hahahaha');

        expect(payload.name).toBe('john');
    });
});
