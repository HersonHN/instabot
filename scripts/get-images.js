
const axios = require('axios');
const config = require('../config');


main();


async function main() {
  // if running from the command line
  if (require.main === module) {
    let images = await getImages();
    console.log(images);
  }
}


async function getImages() {
  let response = await axios.get(config.source);
  return parseContent(response.data);
}


function parseContent(content) {
  let images = content.data.children
    .filter(postFilter)
    .map(post => post.data.url);
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
