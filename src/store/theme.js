export default {
    state() {
        return {
            theme: 'white',
        }
    },
    mutations: {
        setTheme(state, theme) {
            state.theme = theme.text;
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