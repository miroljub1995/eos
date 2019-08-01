const { BrowserWindow } = require('electron');

const props = {
    width: 900,
    height: 70,
    frame: false,
    focusable: false,
    transparent: true,
    webPreferences: {
        nodeIntegration: true
    }
};

class Taskbar extends BrowserWindow {
    constructor(parentWin) {
        super(props);
        this.loadFile('./src/taskbar/index.html');
        let parentSize = parentWin.getSize();
        let parentPos = parentWin.getPosition();
        this.setPosition(
            parentPos[0] + (parentSize[0] - props.width) / 2,
            parentPos[1] + parentSize[1] - props.height + 190);

        //this.openDevTools();

        this.webContents.on('ipc-message', (event, channel, arg) => {
            this.emit(channel, arg);
        });
    }

    onClick = (callback) => {
        this.on('itemClick', callback);
    }
}

module.exports = Taskbar;