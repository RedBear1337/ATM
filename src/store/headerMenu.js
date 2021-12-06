export default {
    state() {
        return {
            isMenuShow: false,
        }
    },
    mutations: {
        setMenuShow(state, boolean) {
            state.isMenuShow = boolean;
        }
    },
    getters: {
        getIsMenuShow(state) {
            return state.isMenuShow;
        }
    },
    actions: {

    }
}