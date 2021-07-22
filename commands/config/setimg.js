const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "setimage",
  category: "settings",
  args: true,
  usage: "<welcome/leave/level> <url image>",
 botPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
  authorPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
   description: "Set the background",
  run: (client, message, args) => {
    function isURL(url) {
      if (!url) return false;
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))|" + // OR ip (v4) address
        "localhost" + // OR localhost
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return pattern.test(url);
    }
    const [key, ...value] = args;
    switch (key) {
      default:
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setFooter(
              message.author.tag,
              message.author.displayAvatarURL({ dynamic: true }) ||
                client.user.displayAvatarURL({ dynamic: true })
            )
            .setDescription("Error: Invalid Key provided, Please try again.")
        );
      case "leave":
        {
          const n = args.slice(1).join(" ");
          if (!n) {
            return message.channel.send(
              `${client.emotes.error} Given Url image is invalid, Make sure you send working URL`
            );
          }
          if (!isURL(n)) {
            return message.channel.send(
              `${client.emotes.error} Given Url image is invalid, Make sure you send working URL`
            );
          }
          client.data.set(`levimage_${message.guild.id}`, n);
          const leave = new Discord.MessageEmbed()
            .setDescription(
              `**Done**\nLeave image has been setted to \n ${n}`
            )
            .setColor("RED");
          message.channel.send(leave);
        }
        break;
      case "welcome":
        {
          const n2 = args.slice(1).join(" ");
          if (!n2) {
            return message.channel.send(
              `${client.emotes.error} Given Url image is invalid, Make sure you send working URL`
            );
          }
          if (!isURL(n2)) {
            return message.channel.send(
              `${client.emotes.error} Given Url is invalid, Make sure you send working URL`
            );
          }
          client.data.set(`welimage_${message.guild.id}`, n2);
          const welcome = new Discord.MessageEmbed()
            .setDescription(
              `**Done**\nWelcome image has been setted to ${n2}`
            )
            .setColor("RED");
          message.channel.send(welcome);
        }
        break;
      case "level": {
        const n = args.slice(1).join(" ");
        if (!n) {
          return message.channel.send(
            `${client.emotes.error} Given Url image is invalid, Make sure you send working URL`
          );
        }
        if (!isURL(n)) {
          return message.channel.send(
            `${client.emotes.error} Given Url image is invalid, Make sure you send working URL`
          );
        }
        client.data.set(`levelimg_${message.guild.id}`, n);
        const level = new Discord.MessageEmbed()
          .setDescription(
            `**Done**\nLevel image has been setted to\n${n}`
          )
          .setColor("RED");
        message.channel.send(level);
      }
    }
  }
};