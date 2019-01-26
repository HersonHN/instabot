module.exports = {
  username: process.env.INSTABOT_USERNAME,
  password: process.env.INSTABOT_PASSWORD,
  source: process.env.INSTABOT_SOURCE,
  hashtags: process.env.INSTABOT_HASHTAGS,
  db: process.env.INSTABOT_DB || "~/uploaded-posts.txt",
};