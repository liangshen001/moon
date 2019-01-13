"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var url = require("url");
var path = require("path");
var win = null;
function screenShot() {
    if (!win) {
        win = createScreenShotWin('/src/shot-screen/index.html');
        win.on('closed', function () { return win = null; });
    }
    return win;
}
exports.screenShot = screenShot;
/**
 * 创建截屏窗口
 */
function createScreenShotWin(_url) {
    var config = {
        fullscreen: true,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        skipTaskbar: true,
        autoHideMenuBar: true
    };
    var _win = new electron_1.BrowserWindow(config);
    console.log("dirname:" + electron_1.app.getAppPath() + ", _url:" + _url);
    _win.loadURL(url.format({
        pathname: path.join(electron_1.app.getAppPath() + _url),
        protocol: 'file',
        slashes: true
    }));
    _win.on('closed', function () {
        _win = null;
    });
    _win.on('close', function () {
        _win = null;
    });
    return _win;
}
//# sourceMappingURL=shot-screen.js.map