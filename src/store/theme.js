export default {
    state() {
        return {
            theme: '',
        }
    },
    mutations: {
        setTheme(state, theme) {
            // state.theme = theme.text;
            state.theme = theme;
        }
    },
    getters: {
        getTheme(state) {
            return state.theme;
        }
    },
    actions: {

    }
}