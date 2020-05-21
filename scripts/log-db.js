
const Path = require('path');
const shell = require('shelljs');

const config = require('../config');
const DB = config.db;


function logDB(url) {
  shell.echo(url).toEnd(DB);
  return Promise.resolve(url);
}


module.exports = logDB;
