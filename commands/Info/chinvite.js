const { MessageEmbed } = require("discord.js");
const Color = "RANDOM";

//starting command handler and command
module.exports = {
  name: "chinv",
  category: "info",
  description: "Gives you a channel invite (no temp) and (temp invite)",
  usage: "chinv | chinv temp",

  run: async(client, message, args) => {
    const channels =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(`${args[0]}`) ||
      message.guild.channels.cache.find(x => x.name === `${args.join(" ")}`) ||
      message.channel;

    let check;
    if (args[0] === "temp") {
      check = "true";
    } else if (args[1] === "temp") {
      check = "true";
    } else {
      check = "false";
    }
    let check2;
    if (args[0] === "temp") {
      check2 = "86400";
    } else if (args[1] === "temp") {
      check2 = "86400";
    } else {
      check2 = "0";
    }

    channels
      .createInvite({
        temporary: `${check}`,
        maxAge: `${check2}`,
        maxUses: 0,
        reason: `©️ SyzeBot`
      })
      .then(InviteCode =>
        message.channel.send(
          new MessageEmbed()
            .setColor(`${Color}`)
            .setTitle(`${channels.name} Invite`)
            .setThumbnail(message.author.displayAvatarURL())
            .addField(`Link Of ${channels.name} Invite`, `https://discord.gg/${InviteCode.code}`)
            .setFooter(`©️ SyzeBot`)
            .setTimestamp()
        )
      );
  }
}