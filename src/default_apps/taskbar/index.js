const { BrowserWindow, screen } = require('electron');
const path = require('path');

let webSecurity = true;
if (process.env.DEV)
    webSecurity = false;

const props = {
    width: 900,
    height: 300,
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

    apps = {};


    constructor(parentWin) {
        super({ ...props, parent: parentWin });
        this.desktopWin = this.parentWin;

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

        this.openDevTools();

        this.webContents.on('ipc-message', (event, channel, arg) => {
            this.emit(channel, arg);
        });
        this.initEvents();
    }

    onClick = (callback) => {
        //callback(arg);
    }
    
        initEvents() {
        this.on('itemClick', ({ app, start }) => {
            let appWin = new BrowserWindow({
                width: 800,
                height: 600,
                webPreferences: {
                    nodeIntegration: true
                },
                parent: this.desktopWin,
                title: app
            });
            appWin.loadURL(start);
            this.apps[app] = {
                windows: [appWin]
            };
        });
    }
}

module.exports = Taskbar;