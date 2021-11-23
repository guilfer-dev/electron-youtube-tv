'use strict';

const { app, BrowserWindow, session } = require('electron');
const path = require('path');

app.on('ready', function () {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    autoHideMenuBar: true,
    fullscreen: true,
    icon: __dirname + '/favicon.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (SMART-TV; LINUX; Tizen 5.5) AppleWebKit/537.36 (KHTML, like Gecko) 69.0.3497.106.1/5.5 TV Safari/537.36';
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });

  win.on('close', (e) => {
    e.preventDefault();
    win.hide();
    win.setSkipTaskbar(true);
  });

  win.loadURL('https://www.youtube.com/tv');

});
