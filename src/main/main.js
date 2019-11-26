const { app, BrowserWindow, ipcMain } = require('electron');
const Taskbar = require('../taskbar');

let taskbar;
let desktop;

function createWindow() {
    let desktop = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        fullscreen: false
    });

    desktop.loadFile('./src/main/index.html');

    taskbar = new Taskbar(desktop);
    taskbar.onClick(({ app, start }) => {
        let appWin = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            },
            parent: desktop,
            title: app
        });
        appWin.loadURL(start);
    });

    desktop.maximize();
    desktop.on('closed', () => {
        //taskbar.close();
        taskbar = null;
        desktop = null;
    });
}

app.on('ready', _ => {
    setTimeout(createWindow, 500);
});