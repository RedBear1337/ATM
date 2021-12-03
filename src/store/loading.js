export default {
    state() {
        return {
            value: 0,
            max: 100,
        }
    },
    mutations: {
        setValue(state, value) {
            state.value = value;
        },
        setMax(state, max) {
            state.max = max;
        },

    },
    getters: {
        getValue(state) {
            return state.value;
        },
        getMax(state) {
            return state.max;
        },

    },
    actions: {

    }
}