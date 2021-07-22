const Discord = require("discord.js");
const db = require('quick.db')

module.exports = {
  name: "autorole",
  aliases: ['setautoroles', 'setautorole'],
  category: "settings",
  args: true,
  permissions: "ADMINISTRATOR",
  usage: "<@roles>",
  description: "Set the Roles Welcome",
  botPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
  authorPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
  run: (client, message, args) => {
    let r = message.mentions.roles.first();
        if (message.guild.me.roles.highest.comparePositionTo(r) < 0) {
      return message.channel.send(
        `My role is not high enough than **${r.name}** role!`
      );
    }
const wel = new Discord.MessageEmbed()
      .setDescription(`**Success**\nAuto-Role Has Been Setted As \n\`${r.name}\``)
      .setColor("RANDOM");
    client.data.set(`roles_${message.guild.id}`, r.id);

    message.channel.send(wel);
  }
};