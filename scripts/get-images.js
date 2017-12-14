
const getJSON = require('get-json');
const config = require('../config.json');


main();


function main() {
  // if running from the command line
  if (require.main === module) {
    getImages().then(console.log);
  }
}


function getImages() {
  return new Promise(function(resolve, reject) {
    getJSON(config.source, function (error, content) {
      if (error) return reject(error);
      content = parseContent(content);
      resolve(content);
    });
  })
}


function parseContent(content) {
  let images = content.data.children.filter(postFilter).map(post => post.data.url);
  return images;
}


function postFilter(post) {
  return isImage(post.data.url) && // is an image
         post.data.whitelist_status == 'all_ads' && // is safe for work
        !post.data.pinned // is not a mod post
}


function isImage(url) {
  let tokens = url.toLowerCase().split('.');
  let extension = tokens[tokens.length - 1];

  // get just the jpeg images since instagram api doesn't support png
  // support could be added via imagemagick to transform before upload
  return (extension == 'jpg' || extension == 'jpeg');
}


module.exports = getImages;
