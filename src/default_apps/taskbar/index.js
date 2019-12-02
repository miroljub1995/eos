const { BrowserWindow, screen } = require('electron');
const path = require('path');

let webSecurity = true;
if(process.env.DEV)
    webSecurity = false;

const props = {
    width: 900,
    height: 30,
    frame: false,
    //focusable: false,
    transparent: true,
    webPreferences: {
        nodeIntegration: true,
        webSecurity
    }
};

const topOffset = 75;

class Taskbar extends BrowserWindow {
    constructor(parentWin) {
        super({ ...props, parent: parentWin });

        const sSize = screen.getPrimaryDisplay().size;
        this.setSize(sSize.width, props.height);


        if (process.env.DEV)
            this.loadURL('http://localhost:3000');
        else
            this.loadFile(path.join(__dirname, 'build', 'index.html'));
        let parentSize = parentWin.getSize();
        let parentPos = parentWin.getPosition();
        // this.setPosition(
        //     parentPos[0] + (parentSize[0] - props.width) / 2,
        //     parentPos[1] + parentSize[1] - props.height + 190);
        this.setPosition(0, topOffset);

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