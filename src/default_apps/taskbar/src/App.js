import React, { Component } from 'react';
import './App.scss';

function App() {

  const fs = window.require('fs');
  const { ipcRenderer } = window.require('electron');
  const { join } = window.require('path');


  // const appsFolder = join(__dirname, "../../../apps");
  const appsFolder = "D:\\eos\\apps";

  const apps = fs.readdirSync(appsFolder, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const appsViews = apps.map(app => {
    const appFolder = join(appsFolder, app);
    var appConfig = JSON.parse(fs.readFileSync(join(appFolder, 'app.json'), 'utf8'));

    let start = appConfig.start;
    if (appConfig.isFile) {
      start = join("file://", appFolder, start);
    }

    const imagePath = join(appFolder, appConfig.icon);
    const appView = (
      <div className="app-item" key={app} onClick={() => ipcRenderer.send('itemClick', { app, start })}>
        <div className="icon" style={{ backgroundImage: `url('${imagePath/*windows only*/.replace(/\\/g, '\\\\')}')` }}>
        </div>
      </div>
    );
    return appView;
  });

  return (
    <div className="container">
      <div className="apps">
        {appsViews}
      </div>
      <div className="tray">
        <Clock />
      </div>
    </div>
  );
}

class Clock extends Component {

  state = {
    date: new Date(),
    updateInterval: null
  };

  constructor() {
    super();

    this.state.updateInterval = setInterval(() => {
      const date = new Date();
      this.setState({ date })
    }, 1000);
  }

  render() {
    return (
      <div className="tray-item">
        {this.state.date.toLocaleTimeString()}
      </div>
    );
  }
}

export default App;
