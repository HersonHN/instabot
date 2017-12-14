
const Path = require('path');
const getJSON = require('get-json');
const shell = require('shelljs');

const config = require('../config.json');
const DB = config.db;


main();


function main() {
  // if running from the command line
  if (require.main === module) {
    const getImages = require('./get-images');
    const checkDB = require('./check-db');

    checkDB()
      .then(getImages)
      .then(checkDuplicates)
      .then(console.log)
      .catch(console.error);
  }
}


function checkDuplicates(images) {
  images = images
    .map(searchDB) // returns only the non-posted images
    .filter(img => img); // remove the empty fields

  if (!images.length) throw 'All images already posted';

  let image = images[0];
  return image;
}


function searchDB(image) {
  let grep = shell.grep(image, DB);
  grep = grep.toString().trim();

  if (grep.length == 0) {
    return image;
  }

  return false;
}


module.exports = checkDuplicates;
