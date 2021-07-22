const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "whale",
  description: "Shows a picture of a whale",
  category: "animal",
  run: async (client, message) => {
    const data = await fetch("http://pics.floofybot.moe/owl").then((res) =>
      res.json()
    );

    const embed = new MessageEmbed()
      .setDescription(`[Click here if image failed to load](${data.image})`)
      .setImage(data.image);

    message.channel.send(embed);
  },
};