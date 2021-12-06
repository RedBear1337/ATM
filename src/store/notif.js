export default {
    state() {
        return {
            /**
             * Тип уведомления - succ | fail
             */
            notifType: '',
            /**
             * Текст ошибки
             */
            errorMessage: '',
        }
    },
    mutations: {
        setNotifType(state, type) {
            state.notifType = type;
        },
        setErrorMessage(state, message) {
            state.errorMessage = message;
        }
    },
    getters: {
        getErrorMessage(state) {
            return state.errorMessage;
        },
        getNotifType(state) {
            return state.notifType;
        },

    },
    actions: {

    }
}