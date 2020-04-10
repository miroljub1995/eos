const { join } = require('path');
const { remote, ipcRenderer } = require('electron');
const fs = require('fs');

const rootFolder = remote.app.getAppPath();
const appsFolder = join(rootFolder, 'apps');

const getAppFolder = (app) => {
    const appFolder = join(appsFolder, app);
    return appFolder;
}

const getAppConfig = (app) => {
    const appFolder = getAppFolder(app)
    const appConfig = JSON.parse(fs.readFileSync(join(appFolder, 'app.json'), 'utf8'));
    return appConfig;
}

const getApps = () => {
    const apps = fs.readdirSync(appsFolder, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    return apps;
}

const getIconBase64 = (app) => {
    const appFolder = getAppFolder(app);
    const appConfig = getAppConfig(app);
    let imagePath = join(appFolder, appConfig.icon).replace(/\\/g, '/');
    const image = fs.readFileSync(imagePath);
    const imageBase64 = image.toString('base64');
    return imageBase64;
}

const open = (app) => {
    const appFolder = getAppFolder(app);
    const appConfig = getAppConfig(app)
    let start = appConfig.start;
    if (appConfig.isFile) {
        start = join("file://", appFolder, start);
    }
    let appWin = new remote.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        parent: this.desktopWin,
        title: app
    });
    appWin.loadURL(start);
}

module.exports = {
    getApps,
    open,
    getIconBase64
};