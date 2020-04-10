import React, { Component } from 'react';
import './App.scss';

const { getApps, open, getIconBase64 } = window.apps;

function App() {
  const apps = getApps();
  const appsViews = apps.map(app => {
    const icon = getIconBase64(app);
    const appView = (
      <div className="app-item" key={app} onClick={() => open(app)}>
        <div className="icon" style={{ backgroundImage: `url('data:image/png;base64,${icon}')` }}>
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
