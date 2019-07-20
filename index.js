
const checkDB = require('./scripts/check-db');
const getImages = require('./scripts/get-images');
const checkDuplicates = require('./scripts/check-duplicates');
const downloadImage = require('./scripts/download-image');
const logDB = require('./scripts/log-db');
const upload = require('./scripts/upload');
const deleteFile = require('./scripts/delete-file');

checkDB()
  .then(getImages)
  .then(checkDuplicates)
  .then(downloadImage)
  .then(function (params) {
    let file = params.file;
    let url = params.url;

    return logDB(url)
      .then(() => upload(file))
      .then(() => deleteFile(file));
  })
  .catch(console.error);
