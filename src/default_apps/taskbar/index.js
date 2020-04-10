const { BrowserWindow, screen, app } = require('electron');
const path = require('path');

const props = {
    width: 900,
    height: 300,
    frame: false,
    //focusable: false,
    transparent: true,
    webPreferences: {
        contextIsolation: true,
        preload: path.join(app.getAppPath(), 'src','main', 'preload.js')
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
    }
}

module.exports = Taskbar;