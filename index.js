const { app, BrowserWindow }  = require('electron');

let mainWindow = null;
app.on('ready', () => {
    console.log('Aplicacão iniciada');
    mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
    });
    
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});