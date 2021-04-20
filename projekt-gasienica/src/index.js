const { app, BrowserWindow } = require('electron');
const path = require('path');
const rpc = require('discord-rpc');
const client = new rpc.Client({ transport: 'ipc' });
const fs = require('fs');
var levels = fs.readdirSync(`${__dirname}/js/jlevels`);
function createJSON() {
  let JSONstring = 'var levels = {';
  for (let i = 0; i < levels.length; i++) {
    JSONstring += `"${levels[i]}":[`;
    let page = fs.readdirSync(`${__dirname}/js/jlevels/` + levels[i]);
    let order = JSON.parse(
      fs.readFileSync(
        `${__dirname}/js/jlevels/${levels[i]}/order.json`,
        'utf8',
        (err) => {
          if (err) {
            return console.log(err);
          }
        }
      )
    );
    let pageOrder = page.splice(page.indexOf('order.json'), 1);
    let newpage = [];
    ordering: for (
      let newpageCounter = 0;
      newpageCounter < page.length;
      newpageCounter++
    ) {
      console.log(page[newpageCounter]);
      newpage[newpageCounter] = page[order.order[newpageCounter]];
    }
    page = newpage;
    levellop: for (let j = 0; j < page.length; j++) {
      let level = page[j].slice(0, -5);
      if (level === 'order') {
        continue levellop;
      }
      JSONstring += `"${level}",`;
      if (j === page.length - 1) {
        JSONstring = JSONstring.slice(0, -1);
      }
    }
    JSONstring += '],';
  }
  JSONstring = JSONstring.slice(0, -1);
  JSONstring += '}';
  return JSONstring;
}

fs.writeFile(`${__dirname}/js/levelList.js`, createJSON(), (err) => {
  if (err) throw err;
  console.log('Data written to file');
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: () => {
      if (process.platform === 'win32') {
        return 620;
      } else {
        return 600;
      }
    },
    resizable: false,
    icon:
      '/run/media/rafii2198/HDD/Szkoła/ProjektEdukacyjnyZespolR/icons/output/icons/png/512x512.png',
  });
  mainWindow.removeMenu();
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
client.on('ready', () => {
  client.setActivity({
    startTimestamp: new Date(),
  });
});
client.login({ clientId: '822244771434594304' });

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
