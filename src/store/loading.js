export default {
    state() {
        return {
            // Progress
            value: 0,
            max: 100,

            // State
            onLoading: false,
        }
    },
    mutations: {
        // Progress
        setValue(state, value) {
            state.value = value;
        },
        setMax(state, max) {
            state.max = max;
        },
        // State changing
        setLoad(state, boolean) {
            state.onLoading = boolean;
        }
    },
    getters: {
        getValue(state) {
            return state.value;
        },
        getMax(state) {
            return state.max;
        },
        getIsOnLoading(state) {
            return state.onLoading
        }
    },
    actions: {
        /**
         * Переключить состояние загрузки на "Загружается"
         * @param ctx
         */
        startLoad(ctx) {
            ctx.commit('setLoad', true);
        },
        /**
         * Переключить состояние загрузки на "Завершенное" и обнулить счётчик прогресса
         * @param ctx
         */
        endLoad(ctx) {
            ctx.commit('setLoad', false);
            ctx.commit('setValue', 0);
        }
    }
}