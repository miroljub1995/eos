const { contextBridge } = require("electron");

const apps = require('../modules/apps');
contextBridge.exposeInMainWorld("apps", apps);