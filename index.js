const { app, BrowserWindow }  = require('electron');

let mainWindow = null;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        show: false,
        width: 900,
        height: 600
    });
    
    mainWindow.show();
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});