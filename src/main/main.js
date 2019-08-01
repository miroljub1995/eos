const { app, BrowserWindow, ipcMain } = require('electron');
const Taskbar = require('../taskbar');

function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        fullscreen: false
    });

    win.loadFile('./src/main/index.html');
    win.maximize();

    let taskbar = new Taskbar(win);
    taskbar.onClick(({ app, start }) => {
        let appWin = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            },
            parent: win,
            title: app
        });
        appWin.loadURL(start);
    });

    win.on('closed', () => {
        taskbar.close();
        win = null;
        taskbar = null;
    });
}

app.on('ready', _ => {
    setTimeout(createWindow, 500);
});