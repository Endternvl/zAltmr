const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ytmsgedit",
  aliases: ["ytmessageedit", "youtubemessageedit"],
  authorPermission: ["ADMINISTRATOR"],
  description:
    "Edit a poster message with a CHANNELLINK, DCCHAT, DCUSER and a MESSAGE",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let toreplace_format =
      `\`{videourl}\` ==> URL / LINK` +
      "\n" +
      `\`{video}\` ==> URL / LINK` +
      "\n" +
      `\`{url}\` ==> URL / LINK` +
      "\n" +
      `*\`{videotitle}\` ==> TITLE / NAME` +
      "\n" +
      `\`{name}\` ==> TITLE / NAME` +
      "\n" +
      `\`{title}\` ==> TITLE / NAME` +
      "\n" +
      `\`{videoauthorname}\` ==> Channel author NAME` +
      "\n" +
      `\`{authorname}\` ==> Channel author NAME` +
      "\n" +
      `\`{author}\` ==> Channel author NAME` +
      "\n" +
      `\`{creator}\` ==> Channel author NAME` +
      "\n" +
      `\`{creatorname}\` ==> Channel author NAME` +
      "\n" +
      `\`{discorduser}\` ==> ID of the LINKED USER` +
      "\n" +
      `\`{user}\` ==> ID of the LINKED USER` +
      "\n" +
      `\`{member}\` ==> ID of the LINKED USER` +
      "\n\n" +
      `**__DEFAULT MESSAGE:__** \`\`\`${client.YTP.options.defaults.Notification}\`\`\``;
    let ChannelLink = args[0];
    let DiscordChannel =
      message.mentions.channels
        .filter(c => c.guild.id == message.guild.id)
        .first() || message.guild.channels.cache.get(args[1]);
    let DiscordUser =
      message.mentions.members
        .filter(m => m.guild.id == message.guild.id)
        .first().user || message.guild.members.cache.get(args[2]).user;
    let Notification =
      args.slice(3).join(" ") || client.YTP.options.defaults.Notification;

    if (!ChannelLink || !DiscordChannel || !DiscordUser)
      return message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setDescription(
            `:x: Usage: \`ytmsgedit <LINK> <CHANNEL> <USER> [TEXT...]\`\n\n**Replacements:**\n` +
              toreplace_format
          )
      );

    client.YTP.editChannel(
      ChannelLink,
      DiscordChannel,
      DiscordUser,
      Notification
    )
      .then(ch => {
        message.channel
          .send(
            new MessageEmbed()
              .setDescription(
                `**Success**\nI've Changed The Notifier Message For ${ch.YTchannel} (<@${ch.DiscordUser}>), Posting Videos On <#${ch.DiscordChannel}>\n\nPoster Message:\n${ch.message}`
              )
              .setAuthor(message.author.tag)
              .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
              .setColor("RANDOM")
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