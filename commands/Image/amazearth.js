const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "earthporn",
  aliases: ["amazingearth", "amazemeearth", "greatearth"],
  description: "Amazing images of light and landscape",
  category: "Image",
  usage: "none",
  run: async (client, message, args) => {
    const data = await fetch(
      "https://www.reddit.com/r/Earthporn/random/.json"
    ).then((res) => res.json());

    const children = data[0].data.children[0];
    const permaLink = children.data.permalink;
    const url = `https://reddit.com${permaLink}`;
    const image = children.data.url;
    const title = children.data.title;
    const upvotes = children.data.ups;
    const comments = children.data.num_comments;

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${title}`)
      .setURL(url)
      .setImage(image)
      .setFooter(`👍 ${upvotes} 💬 ${comments}`);

    message.channel.send({ embed });
  },
};