import fetch from 'node-fetch';

const http = require('http')

class Http {
    constructor() {

    }

    /**
     * Возвращает объект, содержащий курсы валют
     * @return {Promise<*>}
     */
    async parseRates(accessData) {
        return new Promise((resolve, reject) => {
            http.get(accessData.rate + accessData.token, (res) => {

                const {statusCode} = res;
                let error;
                if (statusCode !== 200) {
                    error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
                }
                if (error) {
                    console.error(error.message);
                    // Consume response data to free up memory
                    res.resume();
                    return;
                }
                let rawData = '';
                let parsedData;
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    rawData += chunk;
                });
                res.on('end', () => {
                    try {
                        parsedData = JSON.parse(rawData);
                        if (parsedData.success === true) {
                            resolve(parsedData);
                        } else {
                            reject(new Error('Token is expired'))
                        }
                    } catch (e) {
                        console.error(e.message);
                    }
                });

            })
        })
    }

    /**
     * Возвращает объект, содержащий аббревиатуры валют
     * @return {Promise<*>}
     */
    async parseSymbols(accessData) {
        return new Promise((resolve, reject) => {
            http.get(accessData.abb + accessData.token, (res) => {

                const {statusCode} = res;
                let error;
                if (statusCode !== 200) {
                    error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
                }
                if (error) {
                    console.error(error.message);
                    // Consume response data to free up memory
                    res.resume();
                    return;
                }
                let rawData = '';
                let parsedData;
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    rawData += chunk;
                });
                res.on('end', () => {
                    try {
                        parsedData = JSON.parse(rawData);
                        if (parsedData.success === true) {
                            resolve(parsedData);
                        } else {
                            reject(new Error('Token is expired'))
                        }
                    } catch (e) {
                        console.error(e.message);
                    }
                });

            })
        })
    }

    /**
     * Возвращает код флага для svg изображения в папке assets/svg/flags
     * @return {Promise<*>}
     */
    async parseFlagByFullName(fullName) {
        const cc = require('currency-codes');
        let data;
        let flag;
        try {
            data = await fetch(`https://flagcdn.com/en/codes.json`, {
                method: "GET"
            }).then(async (res) => {
                return res.json();
            });
        } catch (e) {
            console.log('Ошибка получения флага', e);
        }

        let currencyObj = cc.code(fullName);

        try {
            flag = await Object.keys(data).find(key => data[key] === currencyObj.countries[0]);
        } catch (e) {
            return 'empty';
        }
        if (flag !== undefined) {
            return flag;
        } else {
            return 'empty';
        }

    }
}

export default new Http();