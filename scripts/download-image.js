
const Path = require('path');
const wget = require('node-wget');
const config = require('../config.json');

// trailing slash is important for wget api
const tmp = Path.resolve(__dirname, '../tmp') + '/';


main();


function main() {
  // if running from the command line
  if (require.main === module) {
    const image = process.argv[2];
    downloadImage(image).then(console.log);
  }
}


function downloadImage(image) {
  return new Promise(function(resolve, reject) {
    wget({ url: image, dest: tmp }, function (error, response, body) {
      if (error) return reject(error);

      let file = Path.resolve(response.filepath);
      let url = image;
      console.log(`Downloaded image ${url} to ${file}`);

      resolve({ file: file, url: url });
    })
  });
}

module.exports = downloadImage;
