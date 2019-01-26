
InstaBot
========

Takes images from Reddit and post them to Instagram.

## Configuration:

Set these env variables to make it work:

- `INSTABOT_USERNAME`: The Instagram account for the bot.
- `INSTABOT_PASSWORD`: I'm pretty sure you can't access without one. 
- `INSTABOT_SOURCE`: The subreddit `.json` endpoint from where the bot will download the images. For instace: <https://www.reddit.com/r/wholesomememes/top.json?t=week&limit=200>
- `INSTABOT_HASHTAGS`: Hastags for description of each image.
- `INSTABOT_DB`: A plaintext file to store the url of the already uploaded images, default is `~/uploaded-posts.txt`.

