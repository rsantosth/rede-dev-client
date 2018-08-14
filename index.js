const { app, BrowserWindow }  = require('electron');

let mainWindow = null;
app.on('ready', () => {
    console.log('Aplicacão iniciada');
    mainWindow = new BrowserWindow({
        width: 800,
        height: 500,
    });
    
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});