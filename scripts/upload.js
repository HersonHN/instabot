
const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');
const { username, password, hashtags } = require('../config');


main();


function main() {
  // if running from the command line
  if (require.main === module) {
    const image = process.argv[2];
    loginAndUpload(image);
  }
}


async function loginAndUpload(image) {
  if (!image) throw 'No image specified';

  let { instagram } = await login();
  let res = await upload({ instagram, image });

  if (res.status == 'ok') {
    console.log('Uploaded successfully')
  }

  return image;
}


async function login() {
  if (!username) throw 'Please set the username in the ENV variables as INSTABOT_USERNAME';
  if (!password) throw 'Please set the password in the ENV variables as INSTABOT_PASSWORD';

  const instagram = new IgApiClient();
  instagram.state.generateDevice(username);

  await instagram.simulate.preLoginFlow();
  const user = await instagram.account.login(username, password);
  await instagram.simulate.postLoginFlow();

  return { instagram, user };
}

async function upload({ instagram, image }) {
  const imageData = await get({ url: image, encoding: null });
  const res = await instagram.publish.photo({ file: imageData, caption: hashtags });

  return res;
}



module.exports = loginAndUpload;
