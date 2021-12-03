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
        setLists(state, lists) {
            state.symbolsList = lists.symbolsList;
            state.ratesList = lists.ratesList;
        }
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
    actions: {}
}