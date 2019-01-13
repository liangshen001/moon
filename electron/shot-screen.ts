import {app, BrowserWindow} from 'electron';
import * as url from 'url';
import * as path from 'path';

let win = null;

export function screenShot() {
  if (!win) {
      win = createScreenShotWin('/src/shot-screen/index.html');
      win.on('closed', () => win = null);
  }
  return win;
}


/**
 * 创建截屏窗口
 */
function createScreenShotWin(_url) {
  const config = {
    fullscreen: true,
    transparent: true, /* new add line */
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    autoHideMenuBar: true
  };
  let _win = new BrowserWindow(config);
  console.log(`dirname:${app.getAppPath()}, _url:${_url}`);
  _win.loadURL(url.format({
    pathname: path.join(app.getAppPath() + _url),
    protocol: 'file',
    slashes: true
  }));

  _win.on('closed', () => {
    _win = null;
  });
  _win.on('close', () => {
    _win = null;
  });
  return _win;
}

