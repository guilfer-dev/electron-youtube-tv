'use strict';

const { app, BrowserWindow } = require('electron');
const path = require('path');

app.on('ready', function () {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    autoHideMenuBar: true,
    fullscreen: true,
    icon: __dirname + '/favicon.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.webContents.on('before-input-event', (event, input) => {
    if (input.alt && input.key === 'Enter') {
      win.setFullScreen(!win.isFullScreen());
      event.preventDefault();
    }
  })

  win.loadURL('https://www.youtube.com/tv', {
    userAgent: 'Mozilla/5.0 (SMART-TV; LINUX; Tizen 5.5) AppleWebKit/537.36 (KHTML, like Gecko) 69.0.3497.106.1/5.5 TV Safari/537.36'
  });

});
