const { app, BrowserWindow, ipcMain } = require('electron');
const Taskbar = require('../default_apps/taskbar');
const { spawn, spawnSync } = require('child_process');
const path = require('path');

let taskbar;

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
    // taskbar.onClick(({ app, start }) => {
    //     let appWin = new BrowserWindow({
    //         width: 800,
    //         height: 600,
    //         webPreferences: {
    //             nodeIntegration: true
    //         },
    //         parent: desktop,
    //         title: app
    //     });
    //     appWin.loadURL(start);
    // });

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

// app.on('before-quit', (event) => {
//     if (proc !== null && process.env.DEV) {
//         console.log('terminating process');
//         if(process.platform == 'win32')
//         {
//             spawnSync("taskkill", ["/pid", proc.pid, '/f', '/t']);
//         }
//         else
//         {
//             proc.kill();
//         }
//     }
// });