const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "getytchannel",
  aliases: ["getchannel"],
  args: true,
  description: "Get a setup Channel by a CHANNELLINK",
  usage: "getytchannel <link>",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let ChannelLink = args[0];
    client.YTP.getChannel(message.guild.id, ChannelLink)
      .then(ch => {
        message.channel
          .send(
            new MessageEmbed()
              .setColor("GREEN")
              .setDescription(
                `__**Guild:**__\n> **\`${
                  client.guilds.cache.get(ch.DiscordGuild).name
                }\`**` +
                  "\n" +
                  `**__Channel to Post:__**\n> **${message.guild.channels.cache.get(
                    ch.DiscordChannel
                  )}**` +
                  "\n" +
                  `**__Channel Link:__**\n> **${ch.YTchannel}**` +
                  "\n" +
                  `**__Linked User:__**\n> **\`${
                    message.guild.members.cache.get(ch.DiscordUser).user.tag
                  }\`**` +
                  "\n" +
                  `**__Lastest Video:__**\n> **\`https://youtube.com/watch=?v${ch.oldvid}\`**` +
                  "\n" +
                  `**__Message:__**\n>>> \`\`\`${ch.message}\`\`\``
              )
              .setAuthor(message.author.tag)
              .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
          )
      })
      .catch(e => {
        console.log(e);
        message.channel.send(`${e.message ? e.message : e}`, {
          code: "js"
        });
      });
  }
};