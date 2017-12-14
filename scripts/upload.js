
const os = require('os');
const path = require('path');
const Instagram = require('instagram-private-api').V1;
const device = new Instagram.Device('ig-upload');

const tempFile = path.resolve('../tmp/cookies.json');
const storage = new Instagram.CookieFileStorage(tempFile);

const username = process.env.HMMMBOT_USERNAME;
const password = process.env.HMMMBOT_PASSWORD;


init();


function init() {
  const image = process.argv[2];
  if (!image) return console.error('No image specified');
  if (!username) return console.error('Please set the username in the ENV variables as HMMMBOT_USERNAME');
  if (!password) return console.error('Please set the password in the ENV variables as HMMMBOT_PASSWORD');

  login().then(function(session) {
    session.getAccount()
      .then(function (account) {
        console.log(`Logged in as: ${account.params.fullName}`);
        return upload(session, image);
      }).then(function () {
        console.log('Image uploaded!');
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
      return Instagram.Media.configurePhoto(session, upload.params.uploadId, '🤔');
    })
}
