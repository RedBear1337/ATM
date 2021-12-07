import Http from "@/backend/helpers/http";
import {allWindows} from "@/backend/vars/globalVars";
import {errorHandler} from "@/backend/helpers/errorHandler";

class listCompiler {

    constructor() {

    }

    /**
     * Обновляет прогресс бар на фронте (компонент loading)
     * @param {String} value - текущее значение
     * @param {String} max - максимальное значение
     */
    static progressUpdate(value, max) {
        if (!!max) {
            allWindows.win.webContents.send('get-events', {action: 'get-progressBar-update', value: 1, max: max});
        } else {
            allWindows.win.webContents.send('get-events', {action: 'get-progressBar-update', value: value});
        }
    }

    /**
     * Возвращает преобразованный массив курсов валют
     * @param {Object} rates - key: валюта, value: курс
     * @returns {Promise<Array>} - [{name: 'AED', amount: 4.142626}]
     */
    static async createRatesList(rates) {
        let ratesList = [];
        for (let rate in rates.rates) {
            try {
                ratesList.push({name: rate, amount: rates.rates[rate]});
            } catch (e) {
                errorHandler(e, 'Ошибка при формировании массива rates')
            }

        }
        return ratesList;
    }

    static async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Возвращает преобразованный массив аббревиатур, расшифровок и кодов флагов
     * @param {Object} symbols - key: аббревиатура, value: расшифровка
     * @param {Object} flags - .json, содержащий список
     * @param {Function} updFunc - передаваемая функция должна принимать в себя аргументы value, max (именно в таком порядке)
     * @returns {Promise<Array | Error>} - [{key: AED, text: 'United Arab Emirates Dirham', flag: 'ae'}]
     */
    static async createSymbolsList(symbols, flags, updFunc) {
            let symbolsList = [];
            let flag = '';

            // Установлено ли значение max у прогресс бара.
            let isMaxSettled = false;
            for (let symbol in symbols.symbols) {
                let listLength;
                // flag = await this.getFlagByFullName(flags, symbol);
                flag = await Http.getFlagByFullName(flags, symbol);

                try {
                    // key: AED, text: 'United Arab Emirates Dirham', flag: ae - (AED: 'United Arab Emirates Dirham')
                    symbolsList.push({key: symbol, text: symbols.symbols[symbol], flag: flag})
                    this.delay(200).then(() => {
                        if (!isMaxSettled) {
                            listLength = Object.keys(symbols.symbols).length;
                            isMaxSettled = true;
                        }
                        let value = Object.keys(symbols.symbols);
                        value = value.findIndex(item => item === symbol);
                        updFunc(value, listLength);
                    })
                } catch (e) {
                    return errorHandler(e, 'Ошибка при формировании массива symbols');
                }
            }
            return symbolsList;
    }
}

export default listCompiler;