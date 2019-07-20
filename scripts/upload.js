
const os = require('os');
const path = require('path');
const config = require('../config');
const Instagram = require('instagram-web-api');


const tempFile = path.resolve(__dirname, '../tmp/cookies.json');

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

  return login()
    .then(({ instance, info }) => {
      console.log(`Logged in as: ${info.first_name} ${info.last_name}`);
      return upload({ instance, image });
    })
    .catch(console.error)
}


async function login() {
  let instance = new Instagram({ username, password });
  let client = await instance.login();
  let info = await instance.getProfile();
  return { instance, info };
}


async function upload({ instance, image }) {
  image = path.resolve(image);

  await instance.uploadPhoto({
    photo: image,
    caption: config.hashtags
  });

  return 'Image uploaded!';
}

module.exports = loginAndUpload;
