import {app, BrowserWindow, ipcMain, nativeImage} from 'electron';
// import {screenShot} from './electron/shot-screen';
// import * as dotenv from 'dotenv';
import {createTray, createWindow, initElectronMainIpcListener, isMac} from '@ngx-electron/main';
import * as path from 'path';

// try {
//     dotenv.config();
// } catch {
//     console.log('asar');
// }

// ipcMain.on('shot-screen', () => screenShot());

let loginWin, homeWin: BrowserWindow;


function init() {
    // createTray('icon/logo.png');

    loginWin = createWindow('auth', {
        width: 439,
        height: 340,
        alwaysOnTop: true,
        skipTaskbar: true,
        resizable: false,
        fullscreenable: false,
        maximizable: false,
        title: 'moon',

    });
    loginWin.webContents.openDevTools();
    // loginWin = createLoginWindow(appTray);
    loginWin.on('close', () => app.quit());
}
initElectronMainIpcListener();
ipcMain.on('switch-account', () => {
    // loginWin = createLoginWindow(appTray);
    loginWin.on('closed', () => {
        app.quit();
    });
    homeWin.close();
    homeWin = null;
});


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', init);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (loginWin === null) {
        // loginWin = createLoginWindow(appTray);
    }
});
