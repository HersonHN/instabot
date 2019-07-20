
const os = require('os');
const path = require('path');
const Instagram = require('instagram-private-api').V1;
const config = require('../config');


const tempFile = path.resolve(__dirname, '../tmp/cookies.json');
const storage = new Instagram.CookieFileStorage(tempFile);
const device = new Instagram.Device('ig-upload');


const username = config.username;
const password = config.password;

main();


function main() {
  // if running from the command line
  if (require.main === module) {
    const image = process.argv[2];
    loginAndUpload(image);
  }
}


function loginAndUpload(image) {
  if (!image) throw 'No image specified';
  if (!username) throw 'Please set the username in the ENV variables as INSTABOT_USERNAME';
  if (!password) throw 'Please set the password in the ENV variables as INSTABOT_PASSWORD';

  return new Promise(function(resolve, reject) {

    login().then(function(session) {
      session.getAccount()
        .then(function (account) {
          console.log(`Logged in as: ${account.params.fullName}`);
          return upload(session, image);
        }).then(function () {
          console.log('Image uploaded!');
          resolve(image);
        }).catch(reject);
    });

  });
}


function login() {
  return Instagram.Session.create(device, storage, username, password)
}


function upload(session, image) {
  image = path.resolve(image);

  return Instagram.Upload.photo(session, image)
    .then(function(upload) {
      return Instagram.Media.configurePhoto(session, upload.params.uploadId, config.hashtags);
    })
}

module.exports = loginAndUpload;
