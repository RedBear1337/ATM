export default {
    state() {
        return {
            // Data by default
            token: '4d590f55e800d1adf04abbf0279d2fa8',
            linkToRates: 'http://data.fixer.io/api/latest?access_key=',
            linkToAbb: 'http://data.fixer.io/api/symbols?access_key=',
        }
    },
    mutations: {
        setAccessData(state, data) {
            state.token = data.token;
            state.linkToRates = data.rate
            state.linkToAbb = data.abb;
        }
    },
    getters: {
        getToken(state) {
            return state.token;
        },
        getLinkToRates(state) {
            return state.linkToRates;
        },
        getLinkToAbb(state) {
            return state.linkToAbb;
        },
    },
    actions: {

    }
}