export default {
    state() {
        return {
            // Data by default
            defaultToken: 'c0706b8d445e87b7dafd97b0441a654c',
            defaultRates: 'http://data.fixer.io/api/latest?access_key=',
            defaultAbb: 'http://data.fixer.io/api/symbols?access_key=',
            // User data
            token: '',
            linkToRates: '',
            linkToAbb: '',
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
        getDefaultRates(state) {
            return state.defaultRates;
        },
        getDefaultAbb(state) {
            return state.defaultAbb;
        },
        getDefaultToken(state) {
            return state.defaultToken;
        },


    },
    actions: {

    }
}