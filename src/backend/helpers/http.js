import fetch from 'node-fetch';
import {errorHandler} from "@/backend/helpers/errorHandler";

const http = require('http')
const https = require('https')

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
                    errorHandler(error)
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
                            errorHandler(new Error('Token is expired'));
                        }
                    } catch (e) {
                        errorHandler(e);
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
                    errorHandler(error)
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
                            errorHandler(new Error('Token is expired'));
                        }
                    } catch (e) {
                        errorHandler(e);
                    }
                });

            })
        })
    }

    /**
     * Возвращает массив существующих флагов
     * @returns {Promise<unknown>}
     */
    async parseFlags() {
        return new Promise((resolve, reject) => {
                https.get('https://flagcdn.com/en/codes.json', (res) => {

                    const {statusCode} = res;
                    let error;
                    if (statusCode !== 200) {
                        error = new Error('Request Failed.\n' +
                            `Status Code: ${statusCode}`);
                    }
                    if (error) {
                        errorHandler(error)
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
                            resolve(parsedData);
                        } catch (e) {
                            errorHandler(e);
                        }
                    });
                })
        })
    }
    /**
     * Возвращает код флага для svg изображения в папке assets/svg/flags
     * @return {Promise<*>}
     */
    async getFlagByFullName(flagsArr, fullName) {
        const cc = require('currency-codes');
        let flag;

        let currencyObj = cc.code(fullName);

        try {
            flag = await Object.keys(flagsArr).find(key => flagsArr[key] === currencyObj.countries[0]);
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