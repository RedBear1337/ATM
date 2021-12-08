export default {
    state() {
        return {
            listReady: false,
            symbolsList: [],
            ratesList: []
        }
    },
    mutations: {
        setListReady(state, boolean) {
            state.listReady = boolean
        },
        setRatesList(state, rates) {
            state.ratesList = rates;
        },
        setSymbolsList(state, symbols) {
            state.symbolsList = symbols;
        },

    },
    getters: {
        getListReady(state) {
            return state.listReady;
        },
        getSymbolsList(state) {
            return state.symbolsList;
        },
        getRatesList(state) {
            return state.ratesList;
        }
    },
    actions: {
        setLists(ctx, data) {
            ctx.commit('setRatesList', data.rates);
            ctx.commit('setSymbolsList', data.symbols);
        }
    }
}