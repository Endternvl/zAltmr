const Discord = require("discord.js");
const PlayStore = require("google-play-scraper");
const EmbedColor = ``;

module.exports = {
  name: "playstore",
  aliases: ["pstore", "googleplaystore", "ps"],
  description: "Show Playstore Application Information Of Your Given Name!",
  usage: "Playstore <Application Name>",
  category: "info",
  run: async (client, message, args) => {
    if (!args[0])
      return message.channel.send(
        `\🔍 Please Give Something To Search!`
      );

    PlayStore.search({
      term: args.join(" "),
      num: 1
    }).then(Data => {
      let App;

      try {
        App = JSON.parse(JSON.stringify(Data[0]));
      } catch (error) {
        return message.channel.send(
          `No Application Found: **"${args.join(" ")}"**`
        );
      }

      let Embed = new Discord.MessageEmbed()
        .setColor(EmbedColor || "RANDOM")
        .setThumbnail(App.icon)
        .setURL(App.url)
        .setTitle(`${App.title}`)
        .setDescription(App.summary)
        .addField(`Price`, App.priceText, true)
        .addField(`Developer`, App.developer, true)
        .addField(`Score`, App.scoreText, true)
        .setFooter(`Requested By ${message.author.username}`)
        .setTimestamp();

      return message.channel.send(Embed);
    });
  }
};