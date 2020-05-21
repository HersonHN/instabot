
const checkDB = require('./scripts/check-db');
const getImages = require('./scripts/get-images');
const checkDuplicates = require('./scripts/check-duplicates');
const logDB = require('./scripts/log-db');
const upload = require('./scripts/upload');


checkDB()
  .then(getImages)
  .then(checkDuplicates)
  .then(logDB)
  .then(upload)
  .catch(console.error);
