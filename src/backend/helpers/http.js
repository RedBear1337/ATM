import fetch from 'node-fetch';
import {errorHandler} from "@/backend/helpers/errorHandler";

const http = require('http')
const https = require('https')

class Http {
    constructor() {

    }

    /**
     * Возвращает объект, содержащий курсы валют
     * @return {Promise<Object>}
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
                    reject(errorHandler(error, 'rates'))
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
                            reject(errorHandler(new Error('Token is expired'), 'rates'));
                        }
                    } catch (e) {
                        reject(errorHandler(e, 'rates'));
                    }
                });

            })
        })
    }

    /**
     * Возвращает объект, содержащий аббревиатуры валют
     * @return {Promise<Object>}
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
                    reject(errorHandler(error, 'symbols'));
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
                            reject(errorHandler(new Error('Token is expired'), 'symbols'));
                        }
                    } catch (e) {
                        reject((errorHandler(e, 'symbols')));
                    }
                });

            })
        })
    }

    /**
     * Возвращает объект существующих флагов, с парами ключ-значение
     * @returns {Promise<Object>}
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
                        reject(errorHandler(error, 'flags'))
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
                            reject(errorHandler(e, 'flags'));
                        }
                    });
                })
        })
    }
    /**
     * Возвращает код флага для svg изображения в папке assets/svg/flags
     * @param {Object} flagsObj - key: код флага, value: название страны
     * @param {String} fullName - название страны
     * @return {Promise<String>}
     */
    async getFlagByFullName(flagsObj, fullName) {
        const cc = require('currency-codes');
        let flag;

        let currencyObj = cc.code(fullName);

        try {
            // flag = await Object.keys(flagsArr).find(key => flagsArr[key] === currencyObj.countries[0]);
            flag = Object.keys(flagsObj).find(key => flagsObj[key] === currencyObj.countries[0]);
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