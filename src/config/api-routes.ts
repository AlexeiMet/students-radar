export const ApiRoutes = {
    base: 'api',

    get login() {
        return `${this.base}/login`;
    },

    get checkJwt() {
        return `${this.base}/check-jwt`;
    },
};
