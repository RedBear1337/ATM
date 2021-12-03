export default {
    state() {
        return {
            chosenRate: {amount: 0, name: '', alt: '', flag: 'empty'},
            isCardShow: false
        }
    },
    mutations: {
        /**
         * Устанавливает валюту для отображения
         * @param state
         * @param {object} data
         * @param {number} data.amount - цифровое соотношение выбранной валюты к валюте клиента
         * @param {string} data.name - короткая аббревиатура валюты
         * @param {string} data.alt - расшифровка аббревиатуры
         * @param {string} data.flag - название флага для выбора изображения флага
         */
        setRate(state, data) {
            state.chosenRate.amount = data.amount;
            state.chosenRate.name = data.name;
            state.chosenRate.alt = data.alt;
            state.chosenRate.flag = data.flag;
        },
        /**
         * Меняет показ карточки валюты
         * @param state
         * @param {boolean} boolean
         */
        setIsCardShowState(state, boolean) {
            state.isCardShow = boolean;
        }
    },
    getters: {
        getChosenRate(state) {
            return state.chosenRate;
        },
        getIsCardShowState(state) {
            return state.isCardShow;
        }
    },
    actions: {
        chooseCard(ctx, data) {
            ctx.commit('setRate', data);
            ctx.commit('setIsCardShowState', true);
            return 1
        }
    }
}