export default {
    token: {
        secret: 'haha',
        accessTokenExpiresIn: '8h',
        refreshTokenExpiresIn: '14d'
    },

    remoteLoginSource: {
        lms: 'https://cyber.inu.ac.kr/login/index.php',
        study: 'https://ok.inu.ac.kr/learning/ability/wp-login.php'
    },

    server: {
        port: 3000
    },

    log: {
        level: 'debug'
    }
}
