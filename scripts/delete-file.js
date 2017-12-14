
const Path = require('path');
const shell = require('shelljs');

const tmp = Path.resolve(__dirname, '../tmp');


function deleteFile(file) {
  shell.rm(file);
  console.log(`Deleting ${file}`);
  return Promise.resolve(file);
}


module.exports = deleteFile;
