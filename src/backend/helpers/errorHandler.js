import * as electron from "electron";

import {allWindows} from "@/backend/helpers/globalVars";

/**
 * Отправляет информацию об ошибке на frontend в компонент notifModal
 * @param {string} error
 * @param {String} error.message - сообщение об ошибке
 * @param desc - Ручное описание ошибки => "Ошибка получения флага"
 */
export function errorHandler (error, desc) {
     console.log('error', error);
     if (!!desc) {
          allWindows["win"].webContents.send('service-events', {action: 'show-notif', notifData: {type: 'fail', message: desc + ': ' + error.message}})
     } else {
          allWindows["win"].webContents.send('service-events', {action: 'show-notif', notifData: {type: 'fail', message: error.message}})
     }

}