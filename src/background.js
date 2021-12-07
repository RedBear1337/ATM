'use strict'

import {app, protocol, BrowserWindow} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {VUEJS_DEVTOOLS} from 'electron-devtools-installer'
import * as electron from "electron";
import Http from '@/backend/helpers/http'

import {allWindows} from "@/backend/vars/globalVars";
import listCompiler from "@/backend/helpers/listCompiler";

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}}
])

electron.ipcMain.on('get-events', async (event, arg) => {
    switch (arg.action) {
        case ('getList'):

            let rates = await Http.parseRates(arg.accessData)
                .catch((err) => {
                    return false
                });
            let symbols = await Http.parseSymbols(arg.accessData)
                .catch((err) => {
                    return false
                });
            let flags = await Http.parseFlags()
                .catch((err) => {
                    return false
                });

            let ratesList = await listCompiler.createRatesList(rates);
            let symbolsList = await listCompiler.createSymbolsList(symbols, flags, listCompiler.progressUpdate).then((res) => {
                event.reply('get-events', {action: 'getList', rates: ratesList, symbols: res});
            })
    }
})

electron.ipcMain.on('service-events', (event, arg) => {
    switch (arg.action) {
        case ('show-notif'):
            event.reply('service-events', {action: arg.action, notifData: arg.notifData});
            break
        case ('close-win'):
            allWindows['win'].destroy();
            break
        case ('hide-win'):
            allWindows['win'].minimize();
            break
    }
})

/**
 * Создаёт основное окно приложения
 * @return {Promise<void>}
 */
async function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 1200,
        height: 650,
        frame: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    win.setMenuBarVisibility(false);
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }
    allWindows.win = win;
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installExtension(VUEJS_DEVTOOLS)
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }
    await createWindow();
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}
