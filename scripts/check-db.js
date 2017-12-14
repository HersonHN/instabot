
const Path = require('path');
const shell = require('shelljs');

const config = require('../config.json');
const DB = config.db;

main();


function main() {

  // if running from the command line
  if (require.main === module) {
    const getImages = require('./get-images');

    checkDB();
  }
}

function checkDB(param) {
  let lsResult = shell.ls(DB);

  if (lsResult.stderr) {
    let touchResult = shell.touch(DB);
    if (touchResult.stderr) Promise.reject(`Cannot create DB file under: ${DB}`);
  }

  return Promise.resolve(param);

}

module.exports = checkDB;
